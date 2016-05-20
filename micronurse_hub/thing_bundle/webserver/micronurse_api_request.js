/**
 * Created by shengyun-zhou on 5/20/16.
 */

exports.get_request = function(url, data, callback, token=null, sessionid=null){
  var http = require('http');
  var md5 = require('crypto').createHash('md5');
  data.timestamp = Date.parse(new Date());
  md5.update(data.data);
  md5.update(data.timestamp.toString());
  if(token)
    md5.update(token);
  data.sign = md5.digest('hex');
  var outdata = require('querystring').stringify(data);

  var opt = {
    method: 'POST',
    host: 'micronurse-webserver',
    port: 13000,
    path: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': outdata.length
    }
  };
  if(sessionid){
    opt.headers.Cookie = 'sessionid=' + sessionid;
  }
  
  return http.request(opt, callback);
}