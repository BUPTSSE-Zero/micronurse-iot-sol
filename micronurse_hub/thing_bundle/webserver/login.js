/**
 * Created by shengyun-zhou on 5/9/16.
 */

function get_cookie(cookies, name) {
    var cookie_value = undefined;
    for(i = 0; i < cookies.length; i++) {
        var items = cookies[i].split(';');
        for (j = 0; j < items.length; j++) {
            var cookie_key = items[j].trim();
            if (cookie_key.substring(0, name.length + 1) == (name + '=')) {
                cookie_value = decodeURIComponent(cookie_key.substring(name.length + 1));
                break;
            }
        }
    }
    return cookie_value;
}

exports.login = function (phone_number, password, success_cb, fail_cb){
    var outdata={
        data: JSON.stringify({
            phone_number: phone_number,
            password: password
        }),
    };

    var req = require('./micronurse_api_request').get_request('/micronurse/iot/login', outdata, function (res) {
        if (res.statusCode == 200) {
            res.on('data', function (data) {
                var res_data = JSON.parse(data);
                if(res_data.result_code == 0) {
                    console.log("Return token:" + res_data.token);
                    success_cb(res.statusCode, res_data.result_code, res_data.message,
                               res_data.token, get_cookie(res.headers['set-cookie'], 'sessionid'), res_data.nickname);
                }else {
                    fail_cb(res.statusCode, res_data.result_code, res_data.message);
                }
            });
        }else{
            fail_cb(res.statusCode, -1, 'Server error');
        }
    });

    req.on('error', function (e){
        fail_cb(-1, -10, 'Network error');
    });

    req.write(require('querystring').stringify(outdata));
    req.end();
}