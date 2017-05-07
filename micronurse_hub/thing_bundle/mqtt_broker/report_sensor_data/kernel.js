if(hub_shared.user) {
  sendOUT({
    mqtt_publish: JSON.stringify({
      action: 'publish',
      publish_info:{
        topic: 'sensor_data_report',
        topic_user: hub_shared.user.user_id,
        qos: 0,
        retain: false,
        message: IN.json_data
      }
    })
  });
}