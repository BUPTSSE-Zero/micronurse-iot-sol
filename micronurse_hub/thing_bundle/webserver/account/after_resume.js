var token_cache = require('./token_cache');

function logout() {
  var logout = require('../logout');
  logout.logout(hub_shared.token,
    function () {
      console.log('Logout success.');
    }, function () {
      console.log('Logout failed.');
    });

  hub_shared.token = undefined;
  hub_shared.phone_number = undefined;
  token_cache.cache_token();

  sendOUT({
    json_result: JSON.stringify({action: 'logout'}),
    mqtt_connect: JSON.stringify({
      action: 'disconnect'
    })
  });
}

var login = require('../login');

function quick_login(user_id, token) {
    login.quick_login(user_id, token, function (status_code, result_code, message, nickname) {
    hub_shared.phone_number = user_id;
    hub_shared.token = token;
    shared.account.auto_login_timer = null;

    var json_result = JSON.stringify({
      action: 'login',
      result_code: result_code,
      message: message,
      nickname: nickname
    });
    console.log('Auto login success.');
    sendOUT({
      json_result: json_result,
      mqtt_connect: JSON.stringify({
        action: 'connect'
      })
    });

    shared.account.start(function () {
      if(hub_shared.token){
        sendOUT({
          json_result: json_result
        });
      }else{
        logout();
        shared.account.stop();
      }
    }, CONFIG.interval);
  }, function (status_code, result_code, message) {
    var json_result = JSON.stringify({
      action: 'login',
      result_code: result_code,
      message: message
    });
    console.log('Auto login failed.');
    sendOUT({
      json_result: json_result
    });

    if(status_code < 0) {      //Network error, retry to login again after 1 second
      shared.account.auto_login_timer = setTimeout('quick_login(user_id, token)', 1000);
    }else{
      shared.account.auto_login_timer = null;
    }
  });
}

token_cache.read_cache_token(function (user_id, token) {
  if(user_id && token){
    quick_login(user_id, token);
  }
});
