# The following commands run on the remote host
cd /Users/develop/kdc-app/
pwd
variable1=$1
variable1=$2
variable1=$3
variable1=$4
variable1=$5
# echo TAG_NAME = $1
# echo SHORT_SHA= $2
# echo _FIRESTORE_APP_ID= $3
# echo  _ENV= $4
# echo  _FIRESTORE_GROUP= $5
rm -r /Users/develop/kdc-app/ios/ipa
security unlock-keychain -p DevMacK3ralty.
# xcodebuild clean -workspace /Users/develop/kdc-app/ios/mySanitas.xcworkspace -scheme mySanitas
xcodebuild -workspace /Users/develop/kdc-app/ios/mySanitas.xcworkspace -scheme mySanitas -archivePath "/Users/develop/kdc-app/ios/archive_run/.xcarchive" archive
xcodebuild -exportArchive -archivePath /Users/develop/kdc-app/ios/archive_run/mySanitas.xcarchive -exportPath ios/ipa -exportOptionsPlist "/Users/develop/kdc-app/ios/archive_run/mySanitas/exportOptions.plist"
mv /Users/develop/kdc-app/ios/ipa/mySanitas.ipa "react-native-${1}-${2}.ipa"
firebase appdistribution:distribute "react-native-${1}-${2}.ipa" --app $3 --release-notes "[${4}] - ${2} - react-native ipa distribution" --groups "${5}"

exit 0
