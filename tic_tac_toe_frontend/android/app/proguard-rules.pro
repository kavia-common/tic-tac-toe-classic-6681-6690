# React Native specific rules
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep ReactNative-Animated modules
-keep class com.facebook.react.animated.** { *; }

# Keep your custom components
-keep class com.tictactoe.game.** { *; }

# Keep Expo modules
-keep class expo.modules.** { *; }

# Hermes engine
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep native methods
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}

# Keep JavaScript callbacks
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}
