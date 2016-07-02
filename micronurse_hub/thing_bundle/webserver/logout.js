/**
 * Created by shengyun-zhou on 5/20/16.
 */

exports.logout = function (token, success_cb, fail_cb) {
  require('./micronurse_api_request').start_request('/v1/iot/logout', 'DELETE', {},
    function (error, res, data) {
      if(error)
        fail_cb(-1, -1, 'Network error');
      else if(res.statusCode == 204) {
        success_cb();
      }else{
        fail_cb(res.statusCode, data.result_code, data.message);
      }
    }, token);
}
