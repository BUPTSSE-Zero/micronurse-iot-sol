if(IN.mqtt_connected === false){
  shared.mqtt_report_sensor_data.mqtt_connected = false;
}else if(IN.mqtt_connected === true){
  if(hub_shared.user){
    shared.mqtt_report_sensor_data.mqtt_connected = true;
    send_cache_data();
  }
}

if(IN.json_data){
  shared.mqtt_report_sensor_data.sensor_data_cache = shared.mqtt_report_sensor_data.sensor_data_cache.concat(IN.json_data);
  if(shared.mqtt_report_sensor_data.mqtt_connected)
    send_cache_data();
}

function send_cache_data() {
  if(shared.mqtt_report_sensor_data.sensor_data_cache.length === 0)
    return;
  for(i in shared.mqtt_report_sensor_data.sensor_data_cache){
    sendOUT({
      mqtt_publish: JSON.stringify({
        action: 'publish',
        publish_info:{
          topic: 'sensor_data_report',
          topic_user: hub_shared.user.user_id,
          qos: 0,
          retain: false,
          message: shared.mqtt_report_sensor_data.sensor_data_cache[i]
        }
      })
    });
  }
  shared.mqtt_report_sensor_data.sensor_data_cache = [];
}
