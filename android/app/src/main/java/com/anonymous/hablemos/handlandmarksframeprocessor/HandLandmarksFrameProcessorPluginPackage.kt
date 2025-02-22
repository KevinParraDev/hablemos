package com.anonymous.hablemos.handlandmarksframeprocessor

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.mrousavy.camera.frameprocessors.FrameProcessorPluginRegistry
import android.util.Log

class HandLandmarksFrameProcessorPluginPackage : ReactPackage {
  companion object {
    init {
      Log.d("HandLandmarksPlugin", "Registrando HandLandmarks Frame Processor Plugin")

      FrameProcessorPluginRegistry.addFrameProcessorPlugin("handLandmarks") { proxy, options ->
        HandLandmarksFrameProcessorPlugin(proxy, options)
      }
    }
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return emptyList()
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
}

