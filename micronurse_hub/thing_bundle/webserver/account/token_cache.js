/**
 * Created by zhou-shengyun on 16-11-4.
 */

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
