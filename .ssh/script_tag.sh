variable1=$1
variable1=$2
echo número de tag: $2
cd /Users/develop/kdc-app/ios/archive_run/
find . -type f -exec perl -p -i -e "s/$1/$2/g" {} \;
cd /Users/develop/kdc-app/ios/mySanitas/
find . -type f -exec perl -p -i -e "s/$1/$2/g" {} \;

exit 0
