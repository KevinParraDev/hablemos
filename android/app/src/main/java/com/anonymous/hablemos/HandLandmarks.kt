package com.anonymous.hablemos

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.framework.image.MPImage
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.core.OutputHandler
import com.google.mediapipe.tasks.vision.core.RunningMode
import com.google.mediapipe.tasks.vision.handlandmarker.HandLandmarker
import com.google.mediapipe.tasks.vision.handlandmarker.HandLandmarkerResult
import com.mrousavy.camera.frameprocessors.Frame
import com.anonymous.hablemos.HandLandmarkerHolder

class HandLandmarks(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var reactContext: ReactApplicationContext? = null

    init {
        this.reactContext = reactContext
    }

    override fun getName(): String {
        return "HandLandmarks" // The name used to access the module from JavaScript
    }

    // Necesario para NativeEventEmitter
    @ReactMethod
    fun addListener(eventName: String) {
        // No necesitas implementar nada aquí, pero React Native lo requiere.
        Log.d("HandLandmarks", "addListener llamado para $eventName")
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Tampoco necesitas implementar nada aquí, pero React Native lo requiere.
        Log.d("HandLandmarks", "removeListeners llamado, count: $count")
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    @ReactMethod
    fun initModel() {
        // Check if the HandLandmarker has already been initialized
        if (HandLandmarkerHolder.handLandmarker != null) {
            // Model is already initialized, send a status update to JavaScript
            val alreadyInitializedParams = Arguments.createMap()
            alreadyInitializedParams.putString("status", "Model already initialized")
            sendEvent("onHandLandmarksStatus", alreadyInitializedParams)
            return
        }

        // Define the result listener
        val resultListener = OutputHandler.ResultListener { result: HandLandmarkerResult, _: MPImage ->
            Log.d("HandLandmarksFrameProcessor", "Detected ${result.landmarks().size} hands")

            // Prepare the data to be sent back to JavaScript
            val landmarksArray = Arguments.createArray()

            for (handLandmarks in result.landmarks()) {
                val handMap = Arguments.createArray()
                for ((index, handmark) in handLandmarks.withIndex()) {
                    val landmarkMap = Arguments.createMap()
                    landmarkMap.putInt("keypoint", index)
                    landmarkMap.putDouble("x", handmark.x().toDouble())
                    landmarkMap.putDouble("y", handmark.y().toDouble())
                    landmarkMap.putDouble("z", handmark.z().toDouble())
                    handMap.pushMap(landmarkMap)
                }
                landmarksArray.pushArray(handMap)
            }

            var handName = ""

            for(hand in result.handedness()) {
                for(handProps in hand){
                    handName = handProps.categoryName()
                }
            }

            val params = Arguments.createMap()
            params.putArray("landmarks", landmarksArray)
            params.putString("hand", handName)
            // Send the landmarks data back to JavaScript
            sendEvent("onHandLandmarksDetected", params)
        }

        // Initialize the Hand Landmarker
        try {
            val context: Context = reactApplicationContext
            val baseOptions = BaseOptions.builder()
                    .setModelAssetPath("hand_landmarker.task")
                    .build()

            val handLandmarkerOptions = HandLandmarker.HandLandmarkerOptions.builder()
                    .setBaseOptions(baseOptions)
                    .setNumHands(2)
                    .setRunningMode(RunningMode.LIVE_STREAM)
                    .setResultListener(resultListener)
                    .build()

            HandLandmarkerHolder.handLandmarker = HandLandmarker.createFromOptions(context, handLandmarkerOptions)

            // Send success event to JS
            val successParams = Arguments.createMap()
            successParams.putString("status", "Model initialized successfully")
            Log.d("HandLandmarksFrameProcessor", "Emitiendo evento de inicialización")
            sendEvent("onHandLandmarksStatus", successParams)

        } catch (e: Exception) {
            Log.e("HandLandmarksFrameProcessor", "Error initializing HandLandmarker", e)

            // Send error event to JS
            val errorParams = Arguments.createMap()
            errorParams.putString("error", e.message)
            sendEvent("onHandLandmarksError", errorParams)
        }
    }
}