#!/bin/bash

rsync --recursive --copy-links --perms --times --delete --progress --human-readable --exclude=generated --exclude=micronurse_ui/*/node_modules --exclude=bower_components --exclude=*.log * root@101.200.144.204:~/micronurse-iot-sol

