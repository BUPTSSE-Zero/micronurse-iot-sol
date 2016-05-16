#!/usr/bin/env bash

quick_build=0

if [ $# -gt 0 ]; then
    if [ $1 == "install" ]; then
        cd ./ui-widgets
        npm install
        cd ../ui-dev
        npm install
        bower --allow-root install
        cd ../ui-user
        npm install
        bower --allow-root install
        exit 0
    elif [ $1 == "link" ]; then
        cd ./ui-dev/
        npm link ../ui-widgets
        cd ../ui-user
        npm link ../ui-widgets
        exit 0
    elif [ $1 == "quick" ]; then
        quick_build=1
    fi
fi

echo ">>> ui widgets"
cd ./ui-widgets
gulp build
cd ../
mkdir -p ../node_modules/ui-widgets
cp ./ui-widgets/{specs.js,plugins-specs.json} ../node_modules/ui-widgets

echo ">>> ui dev"
mkdir -p ../node_modules/ui-dev
cd ./ui-dev
cp -r ../ui-widgets/public ../../node_modules/ui-dev/.
if [ $quick_build -eq 0 ]; then
    rm -rf ./public
    NODE_ENV=production gulp build
    cd ../
    cp -r ./ui-dev/public ../node_modules/ui-dev/.
else
    NODE_ENV=production gulp hope_js
    cd ../
    cp ./ui-dev/public/js/hope.js ../node_modules/ui-dev/public/js
fi

echo ">>> ui user"
mkdir -p ../node_modules/ui-user
cd ./ui-user
cp -r ../ui-widgets/public ../../node_modules/ui-user/.
if [ $quick_build -eq 0 ]; then
    rm -rf ./public
    NODE_ENV=production gulp build
    cd ../
    cp -r ./ui-user/public ../node_modules/ui-user/.
else
    NODE_ENV=production gulp hope_js
    cd ../
    cp ./ui-user/public/js/hope.js ../node_modules/ui-user/public/js
fi

#chmod -R 777 ../node_modules/ui-dev
#chmod -R 777 ../node_modules/ui-user
#chmod -R 777 ../node_modules/ui-widgets

