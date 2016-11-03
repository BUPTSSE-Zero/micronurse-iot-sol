#!/usr/bin/env bash

echo "Copying micronurse.service to /lib/systemd/system via sudo..."
sudo cp ./micronurse.service /lib/systemd/system

echo "Enabling micronurse.service..."
sudo systemctl enable micronurse.service
