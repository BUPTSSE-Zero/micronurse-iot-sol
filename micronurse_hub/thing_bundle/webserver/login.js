/**
 * Created by shengyun-zhou on 5/9/16.
 */

var api_request = require('./micronurse_api_request');

var get_account_info = function(host, token, success_cb, fail_cb){
  api_request.start_request(host, '/v1/iot/account_info', 'GET', null,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code === 0)
          success_cb(res.statusCode, data.result_code, data.message, data.user);
        else
          fail_cb(res.statusCode, data.result_code, data.message);
      }
    }, token);
};
exports.get_account_info = get_account_info;
exports.quick_login = function (host, user_id, token, success_cb, fail_cb) {
  api_request.start_request(host, '/v1/iot/check_login/' + user_id, 'GET', null,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code === 0){
          get_account_info(host, token, success_cb, fail_cb);
        }else
          fail_cb(res.statusCode, data.result_code, data.message);
      }
    }, token);
};