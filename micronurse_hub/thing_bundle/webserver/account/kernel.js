/**
 * Created by shengyun-zhou on 5/19/16.
 */
const MQTT_TOPIC_IOT_ACCOUNT = 'iot_account';
var token_cache = require('./token_cache');
var account = require('./account');

function logout() {
  hub_shared.user = undefined;
  token_cache.cache_token();
  account.get_temp_token(CONFIG.webserver_host, shared, function () {
    sendOUT({
      json_result: JSON.stringify({
        action: 'logout',
        token: shared.account.anonymous_user.token
      }),
      mqtt_action_json: JSON.stringify({
        action: 'connect',
        connect_info: {
          client_id: 'micronurse_iot_anonymous_user:' + shared.account.anonymous_user.temp_id,
          username: 'micronurse_iot_anonymous_user:' + shared.account.anonymous_user.temp_id,
          password: shared.account.anonymous_user.token
        }
      })
    })
  }, function () {
    shared.account.logout_timer = setTimeout(logout, 3000);
  });
}

if(IN.mqtt_connected){
  var topic_user = null;
  if(hub_shared.user)
    topic_user = hub_shared.user.user_id;
  else if(shared.account.anonymous_user)
    topic_user = shared.account.anonymous_user.temp_id;

  sendOUT({
    mqtt_action_json: JSON.stringify({
      action: 'subscribe',
      subscribe_info: {
        qos: 0,
        topic: MQTT_TOPIC_IOT_ACCOUNT,
        topic_user: topic_user.toString()
      }
    })
  });
  IN.mqtt_connected = false;
}else if(IN.mqtt_message_json){
  var mqtt_message = JSON.parse(IN.mqtt_message_json);
  if(mqtt_message.topic === MQTT_TOPIC_IOT_ACCOUNT){
    var action_info = JSON.parse(mqtt_message.message);
    switch (action_info.action.toLowerCase()){
      case 'login':
        var login = require('../login');
        login.get_account_info(CONFIG.webserver_host, action_info.token,
          function (status_code, result_code, message, user) {
            hub_shared.user = user;
            hub_shared.user.token = action_info.token;
            token_cache.cache_token(user.user_id, action_info.token);
            sendOUT({
              json_result: JSON.stringify({
                action: 'login',
                result_code: 0,
                user: hub_shared.user
              }),
              mqtt_action_json: JSON.stringify({
                action: 'connect',
                connect_info: {
                  client_id: 'micronurse_iot_user:' + hub_shared.user.user_id,
                  username: 'micronurse_iot_user:' + hub_shared.user.user_id,
                  password: hub_shared.user.token
                }
              })
            });
          });
        break;
      case 'logout':
        logout();
        break;
    }
  }
  IN.mqtt_message_json = null;
}
