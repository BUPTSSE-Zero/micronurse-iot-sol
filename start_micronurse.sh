
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
sleep 2

echo "start center ..."
./run_demo center > micronurse_center.log &
sleep 2

echo "start micro nurse hub..."
./hub ./micronurse_hub/config.json > micronurse_hub.log &

echo "visit ip:8080 for develop, ip:3000 for ui view"
