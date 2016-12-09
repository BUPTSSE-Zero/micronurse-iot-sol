var message_info = JSON.parse(IN.mqtt_message);
if(message_info.topic.toLocaleLowerCase() == 'sensor_data_report'){
  if(message_info.topic_user && message_info.topic_user == hub_shared.user_id){
    var sensor_data = JSON.parse(message_info.message);
    if(sensor_data.sensor_type.toLowerCase() == 'gps'){
      sendOUT({
        position: sensor_data.value,
        timestamp: sensor_data.timestamp
      });
    }
  }
}
