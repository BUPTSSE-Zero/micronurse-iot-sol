#!/usr/bin/env bash

quick_build=0
grid_col=0

if [ $# -gt 0 ]; then
	if [ $1 == "global-install" ]; then
		npm install -g mocha
		npm install -g bower
		npm install -g gulp
		npm install -g grunt-cli
		npm install -g stylus
		npm install -g browserify
		npm install -g reactify
		npm install -g babel@5.8.x
		npm install -g http-server
		exit 0
    elif [ $1 == "install" ]; then
        cd ./ui-widgets
        npm install
        cd ../ui-dev
        npm install
        bower --allow-root install
        cd ./ui/bower_components/gridstack
        npm install
        sed -e '1i\@import "properties";' ./src/gridstack.scss > ./src/gridstack.txt
        mv ./src/gridstack.txt ./src/gridstack.scss
        sed -e '1i\@import "properties";' ./src/gridstack-extra.scss > ./src/gridstack.txt
        mv ./src/gridstack.txt ./src/gridstack-extra.scss
        echo "\$gridstack-columns: 12;" > ./src/_properties.scss
        cd ../../../../ui-user
        npm install
        bower --allow-root install
        cd ./ui/bower_components/gridstack
        npm install
        sed -e '1i\@import "properties";' ./src/gridstack.scss > ./src/gridstack.txt
        mv ./src/gridstack.txt ./src/gridstack.scss
        sed -e '1i\@import "properties";' ./src/gridstack-extra.scss > ./src/gridstack.txt
        mv ./src/gridstack.txt ./src/gridstack-extra.scss
        echo "\$gridstack-columns: 12;" > ./src/_properties.scss
        exit 0
    elif [ $1 == "link" ]; then
        cd ./ui-dev/
        npm link ../ui-widgets
        cd ../ui-user
        npm link ../ui-widgets
        exit 0
    elif [ $1 == "quick" ]; then
        quick_build=1
    elif [ $1 -gt 0 ]; then
        grid_col=$1
    fi
fi

echo ">>> ui widgets"
cd ./ui-widgets
gulp build
cd ../
mkdir -p ../ui-widgets
cp ./ui-widgets/{specs.js,plugins-specs.json} ../ui-widgets

echo ">>> ui dev"
mkdir -p ../ui-dev
cd ./ui-dev
cp -r ../ui-widgets/public ../../ui-dev
if [ $quick_build -eq 0 ]; then
    rm -rf ./public
    cd ./ui/bower_components/gridstack
    if [ $grid_col -gt 0 ]; then
        echo "\$gridstack-columns: ${grid_col};" > ./src/_properties.scss
    fi
    grunt sass
    grunt cssmin
    cd ../../../
    NODE_ENV=production gulp build
    cd ../
    cp -r ./ui-dev/public ../ui-dev
else
    NODE_ENV=production gulp hope_js
    cd ../
    cp ./ui-dev/public/js/hope.js ../ui-dev/public/js
fi

echo ">>> ui user"
mkdir -p ../ui-user
cd ./ui-user
cp -r ../ui-widgets/public ../../ui-user
if [ $quick_build -eq 0 ]; then
    rm -rf ./public
    cd ./ui/bower_components/gridstack
    if [ $grid_col -gt 0 ]; then
        echo "\$gridstack-columns: ${grid_col};" > ./src/_properties.scss
    fi
    grunt sass
    grunt cssmin
    cd ../../../
    NODE_ENV=production gulp build
    cd ../
    cp -r ./ui-user/public ../ui-user/.
else
    NODE_ENV=production gulp hope_js
    cd ../
    cp ./ui-user/public/js/hope.js ../ui-user/public/js
fi

