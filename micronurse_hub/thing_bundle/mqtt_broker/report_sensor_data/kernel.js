console.log('Micro nurse hub - report sensor data kernel');

if(hub_shared.phone_number && hub_shared.mqtt_client) {
    hub_shared.mqtt_client.publish('sensor_data_report/' + hub_shared.phone_number,
      IN.json_data, {qos: 0, retain: false});
}