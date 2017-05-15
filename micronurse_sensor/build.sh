#!/usr/bin/env bash

function show_help(){
    echo "Usage: build.sh [options]"
    echo "Options:"
    echo "--install-cmake-js         Install build tool cmake-js"
}

if [ $# -gt 0 ]; then
	if [ $1 == "--install-cmake-js" ]; then
		npm install cmake-js -g
		exit 0
	elif [ $1 == "--help" ]; then
	    show_help
	    exit 0
	else
	    show_help
	    exit 1
	fi
fi

cd ./dht11-sensor
cmake-js compile && cp -r ../dht11-sensor ../../node_modules
cd ../dht22-sensor
cmake-js compile && cp -r ../dht22-sensor ../../node_modules
cd ../heartrate-sensor
cmake-js compile && cp -r ../heartrate-sensor ../../node_modules
cd ../mq2-sensor
cmake-js compile && cp -r ../mq2-sensor ../../node_modules
cd ../ds18b20-sensor
cmake-js compile && cp -r ../ds18b20-sensor ../../node_modules
