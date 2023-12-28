#!/bin/bash

# Nuevo número de versión recibido como argumento
NEW_VERSION="2.12.0.71_qal"

# Rutas a los archivos de configuración para iOS
INFO_PLIST_PATH="/Volumes/Data/Keralty/Nativa/kdc-app/ios/archive/mySanitas.xcarchive/Info.plist"

# Comprobar si se proporcionó una nueva versión
if [ -z "$NEW_VERSION" ]; then
    echo "Error: No se proporcionó una nueva versión."
    exit 1
fi

# Función para cambiar la versión en Info.plist para iOS
update_ios_version() {
    /usr/libexec/PlistBuddy -c "Set ApplicationProperties:CFBundleShortVersionString $NEW_VERSION" "$INFO_PLIST_PATH"
    /usr/libexec/PlistBuddy -c "Set ApplicationProperties:CFBundleVersion $NEW_VERSION" "$INFO_PLIST_PATH"
}

# Actualizar versión para iOS
update_ios_version

echo "Versión actualizada a $NEW_VERSION."