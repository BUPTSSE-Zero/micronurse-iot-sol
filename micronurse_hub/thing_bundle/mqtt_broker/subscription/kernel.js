console.log('Micro nurse hub - MQTT subscription kernel');

if(IN.switch) {
  var topic_user = undefined;
  switch(CONFIG.topic_user_spec){
    case 'login_user':
      if(hub_shared.user_id)
        topic_user = hub_shared.user_id;
      break;
    case 'specific_user':
      topic_user = CONFIG.specific_topic_user;
      break;
  }

  sendOUT({
    mqtt_subscribe: JSON.stringify({
      action: 'subscribe',
      subscribe_info: {
        topic: CONFIG.topic,
        topic_user: topic_user,
        qos: parseInt(CONFIG.qos),
      }
    })
  });
}