#!/bin/bash

function show_help(){
    echo "Usage: sync.sh <remote_host_address> [remote_path]"
}

remote_path=~/micronurse-iot-sol

if [ $# -gt 0 ]; then
    if [ $1 == "--help" ]; then
        show_help
        exit 0
	elif [ $# -gt 1 ]; then
	    remote_path=$2
	fi
else
	show_help
	exit 1
fi

rsync --recursive --copy-links --perms --times --delete --progress --human-readable --exclude=generated --exclude=node_modules --exclude=bower_components --exclude=*.log --exclude=.idea --exclude=build * root@$1:${remote_path}
