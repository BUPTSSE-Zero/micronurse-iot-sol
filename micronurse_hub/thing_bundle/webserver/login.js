/**
 * Created by shengyun-zhou on 5/9/16.
 */

var api_request = require('./micronurse_api_request');

function get_account_info(host, token, cb){
  api_request.start_request(host, '/v1/iot/account_info', 'GET', null, cb, token);
}

exports.quick_login = function (host, user_id, token, success_cb, fail_cb) {
  api_request.start_request(host, '/v1/iot/check_login/' + user_id, 'GET', null,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code == 0){
          get_account_info(host, token, function (error, res, data) {
            if(error)
              fail_cb(-1, -1, 'Network error');
            else{
              if(data.result_code == 0)
                success_cb(res.statusCode, data.result_code, data.message, data.user.nickname);
              else
                fail_cb(res.statusCode, data.result_code, data.message);
            }
          });
        }else
          fail_cb(res.statusCode, data.result_code, data.message);
      }
    }, token);
};

exports.login = function (host, phone_number, password, success_cb, fail_cb){
  var outdata={
    phone_number: phone_number,
    password: password
  };

  api_request.start_request(host, '/v1/iot/login', 'PUT', outdata,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code == 0) {
          console.log("Return token:" + data.token);
          var token = data.token;
          var message = data.message;
          get_account_info(host, token, function (error, res, data) {
            if(error)
              fail_cb(-1, -1, 'Network error');
            else{
              if(data.result_code == 0)
                success_cb(res.statusCode, data.result_code, message, token, data.user.user_id, data.user.nickname);
              else
                fail_cb(res.statusCode, data.result_code, data.message);
            }
          });
        }else{
          fail_cb(res.statusCode, data.result_code, data.message);
        }
      }
    });
};