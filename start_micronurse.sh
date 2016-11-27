#!/bin/sh
cd $(dirname $0)

echo "killing all existing node.js process ..."
case "$(uname -s)" in
   CYGWIN*|MINGW*|MSYS*)
     cmd.exe /c "taskkill /f /im node.exe 2>nul"
     ;;

   *)
     killall node 2>/dev/null
     ;;
esac

echo "start message broker ..."
node ./node_modules/hope-http-broker/bin/start_broker 16666 > broker.log &

echo "start center ..."
node ./node_modules/hope-center/center ./micronurse_center/config.json > micronurse_center.log &

echo "start micro nurse hub..."
node ./node_modules/hope-hub/hub ./micronurse_hub/config.json > micronurse_hub.log &

echo "start startkit hub..."
node ./node_modules/hope-hub/hub ./node_modules/hope-demo/startkit/config.json > startkit.log &

echo "visit http://localhost:8080 for develop, http://localhost:3000 for ui view"
