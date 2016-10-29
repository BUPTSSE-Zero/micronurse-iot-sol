console.log('Micro nurse hub - report sensor data kernel');

if(hub_shared.phone_number) {
  sendOUT({
    mqtt_publish: JSON.stringify({
      action: 'publish',
      publish_info:{
        topic: 'sensor_data_report',
        topic_user: hub_shared.phone_number,
        qos: 0,
        retain: false,
        message: IN.json_data
      }
    })
  });
}