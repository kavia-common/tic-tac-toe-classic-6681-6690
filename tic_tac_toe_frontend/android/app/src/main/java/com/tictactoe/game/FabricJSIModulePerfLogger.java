package com.tictactoe.game;

import com.facebook.react.bridge.ReactMarker;
import com.facebook.react.bridge.ReactMarkerConstants;

public class FabricJSIModulePerfLogger {
    public static void moduleDataCreateStart(String moduleName, int id) {
        ReactMarker.logMarker(ReactMarkerConstants.FABRIC_BEGIN_SECTION, "FabricJSIModule.moduleDataCreateStart");
    }

    public static void moduleDataCreateEnd(String moduleName, int id) {
        ReactMarker.logMarker(ReactMarkerConstants.FABRIC_END_SECTION, "FabricJSIModule.moduleDataCreateEnd");
    }
}
