var token_cache = require('./token_cache');
var account = require('./account');

function try_quick_login() {
  if(hub_shared.user)
    return;
  token_cache.read_cache_token(function (user_id, token) {
    if(user_id && token){
      account.quick_login(CONFIG.webserver_host, hub_shared, user_id, token, function () {
          on_login();
        }, function (status_code, result_code, message) {
          if(status_code > 0){
            token_cache.cache_token();
            send_login_result(result_code, message);
          }else{
            //Network error, retry to login again after 3 second
            shared.account.auto_login_timer = setTimeout(try_quick_login, 3000);
          }
        });
    }else{
      send_login_result(-1);
    }
  });
}

function send_login_result(result_code, message) {
  var result = {
    action: 'login',
    result_code: result_code,
    message: message,
  };
  if(result_code !== 0 && !shared.account.anonymous_user){
    account.get_temp_token(CONFIG.webserver_host, shared, function () {
      result.token = shared.account.anonymous_user.token;
      sendOUT({
        json_result: JSON.stringify(result),
        mqtt_action_json: JSON.stringify({
          action: 'connect',
          connect_info: {
            client_id: 'micronurse_iot_anonymous_user:' + shared.account.anonymous_user.temp_id,
            username: 'micronurse_iot_anonymous_user:' + shared.account.anonymous_user.temp_id,
            password: shared.account.anonymous_user.token
          }
        })
      });
    }, function () {
      shared.account.auto_login_timer = setTimeout(try_quick_login, 3000);
    });
  }else{
    if(result_code !== 0)
      result.token = shared.account.anonymous_user.token;
    else
      result.user = hub_shared.user;
    sendOUT({
      json_result: JSON.stringify(result)
    });
  }
}

function on_login() {
  send_login_result(0);
  sendOUT({
    mqtt_action_json: JSON.stringify({
      action: 'connect',
      connect_info: {
        client_id: 'micronurse_iot_user:' + hub_shared.user.user_id,
        username: 'micronurse_iot_user:' + hub_shared.user.user_id,
        password: hub_shared.user.token
      }
    })
  });
}

try_quick_login();
