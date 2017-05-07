#!/bin/bash

remote_path=/root/micronurse-iot-sol
remote_user=root
remote_host=127.0.0.1

if [ -f sync_config.sh ]; then
    source sync_config.sh;
fi

rsync --recursive --copy-links --perms --times --delete --progress --human-readable --exclude=generated --exclude=node_modules --exclude=bower_components --exclude=*.log --exclude=.idea --exclude=build * ${remote_user}@${remote_host}:${remote_path}
