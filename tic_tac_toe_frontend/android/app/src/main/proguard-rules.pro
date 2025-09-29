# Keep basic ProGuard rules for React Native
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Expo modules and React Native rules
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Expo-specific rules
-keep class expo.modules.** { *; }
-keep class com.tictactoe.game.generated.BasePackageList { *; }

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep JavaScript callbacks
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}

# Keep generic signatures and annotations
-keepattributes Signature
-keepattributes *Annotation*

# Hermes engine
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
