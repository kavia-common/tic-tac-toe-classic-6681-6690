#!/bin/sh
# Initialize gradle wrapper if not present

WRAPPER_JAR="gradle/wrapper/gradle-wrapper.jar"
WRAPPER_PROPERTIES="gradle/wrapper/gradle-wrapper.properties"

if [ ! -f "$WRAPPER_JAR" ]; then
    mkdir -p gradle/wrapper
    echo "distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists" > "$WRAPPER_PROPERTIES"
fi

# Ensure gradlew is executable
chmod +x gradlew
