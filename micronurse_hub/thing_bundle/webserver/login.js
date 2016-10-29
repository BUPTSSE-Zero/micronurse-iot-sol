/**
 * Created by shengyun-zhou on 5/9/16.
 */

var api_request = require('./micronurse_api_request');

function get_account_info(token, cb){
  api_request.start_request('/v1/iot/account_info', 'GET', null, cb, token);
}

exports.quick_login = function (phone_number, token, success_cb, fail_cb) {
  api_request.start_request('/v1/iot/check_login/' + phone_number, 'GET', null,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code == 0){
          get_account_info(token, function (error, res, data) {
            if(error)
              fail_cb(-1, -1, 'Network error');
            else{
              if(data.result_code == 0)
                success_cb(res.statusCode, data.result_code, data.message, data.nickname);
              else
                fail_cb(res.statusCode, data.result_code, data.message);
            }
          });
        }else
          fail_cb(res.statusCode, data.result_code, data.message);
      }
    }, token);
};

exports.login = function (phone_number, password, success_cb, fail_cb){
  var outdata={
    phone_number: phone_number,
    password: password
  };

  api_request.start_request('/v1/iot/login', 'PUT', outdata,
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else{
        if(data.result_code == 0) {
          console.log("Return token:" + data.token);
          var token = data.token;
          var message = data.message;
          get_account_info(token, function (error, res, data) {
            if(error)
              fail_cb(-1, -1, 'Network error');
            else{
              if(data.result_code == 0)
                success_cb(res.statusCode, data.result_code, message, token, data.nickname);
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

var fs = require('fs');
var file_name = 'token-cache';

exports.read_cache_token = function (cb) {
  fs.readFile(file_name, {encoding: 'utf-8'}, function (error, data){
    if(error) {
      console.log(error);
      cb();
      return;
    }
    try{
      token_info = JSON.parse(data);
      cb(token_info.user_id, token_info.token);
    }catch (e){
      console.log(e);
    }
    cb();
  });
};

exports.cache_token = function (user_id, token) {
  var token_info = {
    user_id: user_id,
    token: token
  };
  fs.writeFile(file_name, JSON.stringify(token_info), {encoding: 'utf-8'},
    function (err) {
      if(err)
        console.log(err);
    });
};