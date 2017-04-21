console.log('Micro nurse hub - report sensor data kernel');

if(hub_shared.has_login && hub_shared.user_id) {
  sendOUT({
    mqtt_publish: JSON.stringify({
      action: 'publish',
      publish_info:{
        topic: 'sensor_data_report',
        topic_user: hub_shared.user_id,
        qos: 0,
        retain: false,
        message: IN.json_data
      }
    })
  });
}