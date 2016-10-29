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

  sendOUT({
    json_result: JSON.stringify({action: 'logout'}),
    mqtt_connect: JSON.stringify({
      action: 'disconnect'
    })
  });
}

var login = require('../login');
login.read_cache_token(function (user_id, token) {
  if(user_id && token){
    login.quick_login(user_id, token, function (status_code, result_code, message, nickname) {
      hub_shared.phone_number = user_id;
      hub_shared.token = token;

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
    });
  }
});

