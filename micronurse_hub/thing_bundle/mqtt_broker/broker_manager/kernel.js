console.log('Micro nurse hub - MQTT broker manager kernel');
var mqtt_action = JSON.parse(IN.mqtt_action);

switch(mqtt_action.action) {
  case 'connect':
    if(!shared.broker_manager.mqtt_client){
      var mqtt = require('mqtt');
      var client = mqtt.connect('mqtt://' + CONFIG.broker_host +':13883', {
        clientId: 'micronurse_iot_user:' + hub_shared.user_id,
        connectTimeout: 15 * 1000,
        username: 'micronurse_iot_user:' + hub_shared.user_id,
        password: hub_shared.token,
        queueQoSZero: false
      });

      client.on('connect', function () {
        console.log('Connect to MQTT broker successfully.');
        shared.broker_manager.mqtt_client = client;
        sendOUT({
          connected: true
        });
      });

      client.on('message', function (topic, message) {
        var message_info = parse_full_topic(topic);
        message_info.message = message.toString();
        sendOUT({
          message_json: JSON.stringify(message_info)
        });
      });
    }
    break;
  case 'disconnect':
    if(shared.broker_manager.mqtt_client){
      shared.broker_manager.mqtt_client.end();
      shared.broker_manager.mqtt_client = undefined;
      console.log('Disconnected from MQTT broker.');
    }
    break;
  case 'publish':
    if (shared.broker_manager.mqtt_client) {
      var publish_info = mqtt_action.publish_info;
      shared.broker_manager.mqtt_client.publish(get_full_topic(publish_info),
        publish_info.message, {qos: publish_info.qos, retain: publish_info.retain});
    }
    break;
  case 'subscribe':
    if (shared.broker_manager.mqtt_client) {
      var subscribe_info = mqtt_action.subscribe_info;
      shared.broker_manager.mqtt_client.subscribe(get_full_topic(subscribe_info),
        {qos: subscribe_info.qos});
    }
    break;
}

function get_full_topic(topic_info) {
  var topic = topic_info.topic;
  if (topic_info.topic_receiver)
    topic += '/' + topic_info.topic_receiver;
  if (topic_info.topic_user)
    topic += '/' + topic_info.topic_user;
  return topic;
}

function parse_full_topic(topic) {
  var topic_user = undefined;
  var topic_receiver = undefined;
  var topic_split = topic.split('/');
  if(topic_split.length > 1) {
    topic_user = topic_split[topic_split.length - 1];
    var end = topic_split.length - 1;
    if(topic_split.length > 2){
      topic_receiver = topic_split[topic_split.length - 2];
      end = topic_split.length - 2;
    }
    topic = '';
    for(i = 0; i < end; i++){
      topic += topic_split[i];
      if(i < end - 1)
        topic += '/';
    }
  }
  return {
    topic: topic,
    topic_user: topic_user,
    topic_receiver: topic_receiver
  }
}
