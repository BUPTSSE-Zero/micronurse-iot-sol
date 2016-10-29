/**
 * Created by shengyun-zhou on 5/20/16.
 */

exports.start_request = function(url, method, json_data, callback, token, timeout){
  var req = require('request');

  var opt = {
    method: method,
    url: 'http://micronurse-webserver:13000/micronurse' + url,
    headers: {},
    json: true
  };

  if(json_data)
    opt.body = json_data;
  if(token)
    opt.headers['Auth-Token'] = token;
  if(timeout)
    opt.timeout = timeout;
  req(opt, function (error, res, data) {
    callback(error, res, data);
  });
};