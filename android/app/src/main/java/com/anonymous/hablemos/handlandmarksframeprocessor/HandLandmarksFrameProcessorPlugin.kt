package com.anonymous.hablemos.handlandmarksframeprocessor

import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.framework.image.MPImage
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import android.util.Log
import com.anonymous.hablemos.HandLandmarkerHolder

class HandLandmarksFrameProcessorPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?): FrameProcessorPlugin() {
  init {
        Log.d("HandLandmarksPlugin", "Frame Processor Plugin llamado con opciones: $options")
  }
  override fun callback(frame: Frame, arguments: Map<String, Any>?): Any {
    Log.d("HandLandmarksFramePlugin", "callback() llamado con frame")
    if (HandLandmarkerHolder.handLandmarker == null) {
      Log.d("HandLandmarksPlugin", "handlandmaker es null")
      return "HandLandmarker is not initialized" // Return early if initialization failed
    }

     try {
      Log.d("HandLandmarksPlugin", "Procesando frame desde plugin")
      // Convert the frame to an MPImage
      val mpImage: MPImage = BitmapImageBuilder(frame.imageProxy.toBitmap()).build()

       // Get the timestamp from the frame
       val timestamp = frame.timestamp ?: System.currentTimeMillis()

       // Call detectAsync with MPImage and timestamp
       HandLandmarkerHolder.handLandmarker?.detectAsync(mpImage, timestamp)

      return "Frame processed successfully"
    } catch (e: Exception) {
      e.printStackTrace()
      Log.e("HandLandmarksFrameProcessor", "Error processing frame: ${e.message}")
      return "Error processing frame: ${e.message}"
    }

  }
}