/**
 * Created by shengyun-zhou on 5/19/16.
 */

console.log('Micro nurse hub - account kernel');
if(IN.action) {
  var action_info = JSON.parse(IN.action);

  switch (action_info.action) {
    case 'login':
      var login = require('./login');
      login.login(hub_shared, action_info.phone_number, action_info.password,
        function (status_code, result_code, message) {
          var json_result = JSON.stringify({
            action: action_info.action,
            result_code: result_code,
            nickname: hub_shared.nickname,
            message: message
          });
          sendOUT({
            json_result: json_result
          });
        }, function (status_code, result_code, message) {
          var json_result = JSON.stringify({
            action: action_info.action,
            result_code: result_code,
            message: message
          });
          sendOUT({
            json_result: json_result
          });
        });
      break;
  }
}

