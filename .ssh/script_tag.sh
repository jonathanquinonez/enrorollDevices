variable1=$1
variable1=$2
echo número de tag: $2
cd /Volumes/Data/Keralty/Nativa/kdc-app/
find . -type f -exec perl -p -i -e "s/$1/$2/g" {} \;
cd /Volumes/Data/Keralty/Nativa/kdc-app/
find . -type f -exec perl -p -i -e "s/$1/$2/g" {} \;

exit 0
