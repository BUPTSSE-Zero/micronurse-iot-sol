var mqtt_action = JSON.parse(IN.mqtt_action_json);

switch(mqtt_action.action.toLowerCase()) {
  case 'connect':
    var mqtt = require('mqtt');
    if(shared.broker_manager.mqtt_client){
      shared.broker_manager.mqtt_client.end();
      shared.broker_manager.mqtt_client = null;
    }
    var client = mqtt.connect(`mqtt://${CONFIG.broker_host}`, {
      clientId: mqtt_action.connect_info.client_id,
      connectTimeout: 15 * 1000,
      username: mqtt_action.connect_info.username,
      password: mqtt_action.connect_info.password,
      reconnectPeriod: 3000,
      clean: false,
      queueQoSZero: true,
      keepalive: 60
    });

    client.on('connect', function (connack) {
      console.log('Connect to MQTT broker successfully.');
      shared.broker_manager.mqtt_client = client;
      sendOUT({
        connected: true
      });
    });

    client.on('offline', function () {
      sendOUT({
        connected: false
      });
    });

    client.on('message', function (topic, message) {
      var message_info = parse_full_topic(topic);
      message_info.message = message.toString();
      sendOUT({
        message_json: JSON.stringify(message_info)
      });
    });
    break;
  case 'disconnect':
    if(shared.broker_manager.mqtt_client){
      shared.broker_manager.mqtt_client.end();
      shared.broker_manager.mqtt_client = null;
      console.log('Disconnected from MQTT broker.');
      sendOUT({
        connected: false
      });
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
  if (topic_info.topic_user)
    topic += '/' + topic_info.topic_user;
  return topic;
}

function parse_full_topic(full_topic) {
  var topic_split = full_topic.split('/');
  var topic = topic_split[0];
  var topic_user = topic_split[1];

  return {
    topic: topic,
    topic_user: topic_user
  }
}
