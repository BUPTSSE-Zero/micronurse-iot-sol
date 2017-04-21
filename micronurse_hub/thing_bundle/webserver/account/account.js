/**
 * Created by shengyun-zhou on 17-4-20.
 */
var get_temp_token = function (host, shared, success_cb, fail_cb) {
  var api_request = require('../micronurse_api_request');
  api_request.start_request(host, '/v1/iot/anonymous_token', 'POST', null,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else if(data.result_code === 0){
        shared.account.anonymous_user = {
          temp_id: data.id,
          token: data.token,
          expire: parseInt(data.expire)
        };
        success_cb(res.statusCode, data.result_code, data.message);
      }else{
        fail_cb(res.statusCode, data.result_code, data.message);
      }
    });
};

var quick_login = function(host, hub_shared, user_id, token, success_cb, fail_cb) {
  var login = require('../login');
  login.quick_login(host, user_id, token, function (status_code, result_code, message, user) {
    hub_shared.user = user;
    hub_shared.user.token = token;
    console.log('Automatic signing in success.');
    success_cb(status_code, result_code, message);
  }, function (status_code, result_code, message) {
    console.log('Automatic signing in failed.');
    fail_cb(status_code, result_code, message);
  });
};

exports.get_temp_token = get_temp_token;
exports.quick_login = quick_login;
