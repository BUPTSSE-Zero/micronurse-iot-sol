#!/bin/bash

rsync --recursive --copy-links --perms --times --delete --progress --human-readable --exclude=generated --exclude=node_modules --exclude=micronurse_ui --exclude=bower_components --exclude=*.log --exclude=.idea --exclude=build * root@$1:~/micronurse-iot-sol
