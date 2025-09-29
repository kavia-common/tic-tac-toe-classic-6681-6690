#!/bin/sh
# All-in-one gradle configuration and wrapper

# Set up required directories
ANDROID_DIR="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$ANDROID_DIR/gradle/wrapper"
mkdir -p "$ANDROID_DIR/app/build"

# Create gradle.properties
cat > "$ANDROID_DIR/gradle.properties" << 'EOL'
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
android.useAndroidX=true
android.enableJetifier=true
org.gradle.daemon=true
android.defaults.buildfeatures.buildconfig=true
EOL

# Create minimal settings.gradle
cat > "$ANDROID_DIR/settings.gradle" << 'EOL'
rootProject.name = 'tic_tac_toe_frontend'
include ':app'
apply from: new File(["node", "--print", "require.resolve('expo/package.json')"].execute(null, rootDir).text.trim(), "../scripts/autolinking.gradle")
useExpoModules()
EOL

# Create wrapper properties
cat > "$ANDROID_DIR/gradle/wrapper/gradle-wrapper.properties" << 'EOL'
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
EOL

# Create symbolic link for gradlew
ln -sf "$ANDROID_DIR/gradle-wrapper.sh" "$ANDROID_DIR/gradlew"
chmod +x "$ANDROID_DIR/gradlew"

# If we're being executed directly, run gradle
if [ "$(basename "$0")" = "gradlew" ]; then
    if [ ! -f "$ANDROID_DIR/gradle/wrapper/gradle-wrapper.jar" ]; then
        echo "Downloading Gradle wrapper..."
        WRAPPER_JAR_URL="https://raw.githubusercontent.com/gradle/gradle/v7.5.1/gradle/wrapper/gradle-wrapper.jar"
        curl -L -o "$ANDROID_DIR/gradle/wrapper/gradle-wrapper.jar" "$WRAPPER_JAR_URL"
    fi
    
    exec java \
        -Dorg.gradle.appname=gradlew \
        -jar "$ANDROID_DIR/gradle/wrapper/gradle-wrapper.jar" \
        "$@"
fi
