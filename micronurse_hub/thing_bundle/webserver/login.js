/**
 * Created by shengyun-zhou on 5/9/16.
 */

exports.login = function (phone_number, password, success_cb, fail_cb){
    var outdata={
        phone_number: phone_number,
        password: password
    };

    require('./micronurse_api_request').start_request('/v1/iot/login', 'PUT', outdata,
        function (error, res, data) {
            if(error)
                fail_cb(-1, -1, 'Network error');
            else{
                if(data.result_code == 0) {
                    console.log("Return token:" + data.token);
                    success_cb(res.statusCode, data.result_code, data.message,
                               data.token, data.nickname);
                }else{
                    fail_cb(res.statusCode, data.result_code, data.message);
                }
            }
        });
}