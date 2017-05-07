#!/usr/bin/env bash

quick_build=0
grid_col=0      # Default value: 30

function show_help(){
    echo "Usage: buildui.sh [options]"
    echo "Options:"
    echo "--install-build-tools         Install all the needed Node.js build tools"
    echo "--install-dependencies        Install all the needed Node.js module dependencies"
    echo "--link-widgets                Link ui-widgets to ui-dev and ui-user"
    echo "--quick                       Quick building, only build widgets into hope.js of ui-dev and ui-user"
    echo "--grid-columns <col-num>      Specify number of columns of grid layout of UI-IDE and UI"
}

if [ $# -gt 0 ]; then
    if [ $1 == "--help" ]; then
        show_help
        exit 0
	elif [ $1 == "--install-build-tools" ]; then
		npm install -g bower
		npm install -g gulp
		npm install -g grunt-cli
		npm install -g stylus
		npm install -g browserify
		npm install -g reactify
		npm install -g babel
		exit 0
    elif [ $1 == "--install-dependencies" ]; then
        grid_col=30
        cd ./ui-widgets
        npm install
        cd ../ui-dev
        npm install
        bower --allow-root install
        cd ./ui/bower_components/gridstack
        npm install
        sed -i -e '1i\@import "properties";' ./src/gridstack.scss
        sed -i -e '1i\@import "properties";' ./src/gridstack-extra.scss
        echo "\$gridstack-columns: ${grid_col};" > ./src/_properties.scss
        cd ../../../../ui-user
        npm install
        bower --allow-root install
        cd ./ui/bower_components/gridstack
        npm install
        sed -i -e '1i\@import "properties";' ./src/gridstack.scss
        sed -i -e '1i\@import "properties";' ./src/gridstack-extra.scss
        echo "\$gridstack-columns: ${grid_col};" > ./src/_properties.scss
        exit 0
    elif [ $1 == "--link-widgets" ]; then
        cd ./ui-dev/
        npm link ../ui-widgets
        cd ../ui-user
        npm link ../ui-widgets
        exit 0
    elif [ $1 == "--quick" ]; then
        quick_build=1
    elif [ $1 == "--grid-columns" ]; then
        if [ $2 -gt 0 ]; then
            grid_col=$2
        fi
    else
        show_help
        exit 1
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
	if [ $grid_col -gt 0 ]; then
        sed -i "s/widget_cols:.*,/widget_cols: ${grid_col},/1" ui/js/config.js
    fi
    gulp build
    cd ../
    cp -r ./ui-dev/public ../ui-dev
else
    gulp hope_js
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
	if [ $grid_col -gt 0 ]; then
        sed -i "s/widget_cols:.*,/widget_cols: ${grid_col},/1" ui/js/config.js
    fi
    gulp build
    cd ../
    cp -r ./ui-user/public ../ui-user/.
else
    gulp hope_js
    cd ../
    cp ./ui-user/public/js/hope.js ../ui-user/public/js
fi

