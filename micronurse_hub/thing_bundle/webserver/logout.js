/**
 * Created by shengyun-zhou on 5/20/16.
 */

exports.logout = function (phone_number, token, sessionid, success_cb, fail_cb) {
  var outdata={
    data: JSON.stringify({
      phone_number: phone_number,
    }),
  };

  var req = require('./micronurse_api_request').get_request('/micronurse/iot/logout', outdata, function (res) {
    if (res.statusCode == 200) {
      res.on('data', function (data) {
        var res_data = JSON.parse(data);
        if(res_data.result_code == 0) {
          success_cb(res.statusCode, res_data.result_code, res_data.message);
        }else {
          fail_cb(res.statusCode, res_data.result_code, res_data.message);
        }
      });
    }else{
      fail_cb(res.statusCode, -1, 'Server error');
    }
  }, token, sessionid);

  req.on('error', function (e){
    fail_cb(-1, -10, 'Network error');
  });

  req.write(require('querystring').stringify(outdata));
  req.end();
}
