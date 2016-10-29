/**
 * Created by shengyun-zhou on 5/19/16.
 */

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

console.log('Micro nurse hub - account kernel');
if(IN.action) {
  var action_info = JSON.parse(IN.action);

  switch (action_info.action) {
    case 'login':
      shared.account.stop();
      var login = require('../login');
      login.login(action_info.phone_number, action_info.password,
        function (status_code, result_code, message, token, nickname) {
          hub_shared.phone_number = action_info.phone_number;
          hub_shared.token = token;

          var json_result = JSON.stringify({
            action: action_info.action,
            result_code: result_code,
            nickname: nickname,
            message: message
          });
          console.log('Login success.');
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
            action: action_info.action,
            result_code: result_code,
            message: message
          });
          console.log('Login failed.');
          sendOUT({
            json_result: json_result
          });
        });
      break;
    case 'logout':
      shared.account.stop();
      logout();
      break;
  }
}

