console.log('Micro nurse hub - broker connection kernel');
if(IN.connect && !hub_shared.mqtt_client){
  var mqtt = require('mqtt');
  var client  = mqtt.connect('mqtt://micronurse-webserver:13883',{
    clientId: 'micronurse_iot_user:' + hub_shared.phone_number,
    connectTimeout: 15 * 1000,
    username: 'micronurse_iot_user:' + hub_shared.phone_number,
    password: hub_shared.token
  });

  client.on('connect', function () {
    console.log('Connect to MQTT broker successfully.');
    hub_shared.mqtt_client = client;
  });
}else if(!IN.connect && hub_shared.mqtt_client){
  hub_shared.mqtt_client.end();
  hub_shared.mqtt_client = undefined;
  console.log('Disconnected from MQTT broker.');
}
