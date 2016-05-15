#!/usr/bin/env bash

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
    fi

    if [ $1 == "link" ]; then
        cd ./ui-dev/
        npm link ../ui-widgets
        cd ../ui-user
        npm link ../ui-widgets
        exit 0
    fi
fi

echo ">>> ui widgets"
cd ./ui-widgets
gulp build
cd ../
mkdir -p ../node_modules/ui-widgets
cp ./ui-widgets/{specs.js,plugins-specs.json} ../node_modules/ui-widgets

echo ">>> ui dev"
cd ./ui-dev
rm -rf ./public
NODE_ENV=production gulp build
cd ../
mkdir -p ../node_modules/ui-dev
cp -r ./ui-dev/public ../node_modules/ui-dev/.

echo ">>> ui user"
cd ./ui-user
rm -rf ./public
NODE_ENV=production gulp build
cd ../
mkdir -p ../node_modules/ui-user
cp -r ./ui-user/public ../node_modules/ui-user/.

#chmod -R 777 ../node_modules/ui-dev
#chmod -R 777 ../node_modules/ui-user
#chmod -R 777 ../node_modules/ui-widgets

