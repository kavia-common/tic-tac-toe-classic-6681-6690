#!/bin/sh

# Get absolute path
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Make this script executable
chmod +x "$0"

# Create gradlew if it doesn't exist
if [ ! -f "./gradlew" ]; then
    cat > "./gradlew" << 'EOL'
#!/bin/sh
exec java -jar gradle/wrapper/gradle-wrapper.jar "$@"
EOL
    chmod +x "./gradlew"
fi

# Create directories
mkdir -p gradle/wrapper

# Create minimal wrapper.properties
cat > "./gradle/wrapper/gradle-wrapper.properties" << 'EOL'
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-bin.zip
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStorePath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
EOL

# Create symbolic link to this script as gradlew
ln -sf "$SCRIPT_DIR/build.sh" "$SCRIPT_DIR/gradlew"

# Execute gradle command
java -jar gradle/wrapper/gradle-wrapper.jar "$@"
