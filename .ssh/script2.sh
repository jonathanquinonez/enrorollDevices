#!/bin/sh

# The following commands run on the remote host

# Set variables from command line arguments
TAG_NAME=$1
SHORT_SHA=$2
FIRESTORE_APP_ID=$3
ENV=$4
FIRESTORE_GROUP=$5

# Print the variables for debugging
echo "TAG_NAME = $TAG_NAME"
echo "SHORT_SHA = $SHORT_SHA"
echo "_FIRESTORE_APP_ID = $FIRESTORE_APP_ID"
echo "_ENV = $ENV"
echo "_FIRESTORE_GROUP = $FIRESTORE_GROUP"

# Change the working directory
cd /Volumes/Data/Keralty/Nativa/kdc-app/

# Remove a directory
rm -r ios/ipa

# Unlock keychain for auto-signing package
security unlock-keychain -p DevMacK3ralty.

# Build an archive
xcodebuild -workspace ios/mySanitas.xcworkspace -scheme mySanitas -derivedDataPath ios/build -archivePath ios/archive/mySanitas.xcarchive archive | xcpretty

# Export the archive to an *.ipa package
xcodebuild -exportArchive -archivePath ios/archive/mySanitas.xcarchive -exportPath ios/ipa -exportOptionsPlist ios/exportOptions.plist

# Rename the resulting IPA file
mv ios/ipa/mySanitas.ipa "react-native-$TAG_NAME-$SHORT_SHA.ipa"



# Distribute the IPA using Firebase App Distribution
firebase appdistribution:distribute "react-native-$TAG_NAME-$SHORT_SHA.ipa" --app "$FIRESTORE_APP_ID" --release-notes "[$ENV] - $SHORT_SHA - react-native ipa distribution" --groups "$FIRESTORE_GROUP"

mv react-native-$TAG_NAME-$SHORT_SHA.ipa /Volumes/Data/Keralty/Nativa/kdc-app/ios/ipa
# Exit with a success status code
exit 0
