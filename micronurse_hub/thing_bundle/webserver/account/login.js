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

exports.login = function (shared, phone_number, password, success_cb, fail_cb){
    var http = require('http');
    var outdata={
        data: JSON.stringify({
            phone_number: phone_number,
            password: password
        }),
        timestamp: Date.parse(new Date())
    };
    var md5 = require('crypto').createHash('md5');
    md5.update(outdata.data);
    md5.update(outdata.timestamp.toString());
    outdata.sign = md5.digest('hex')
    console.log('Login JSON:' + JSON.stringify(outdata));
    outdata = require('querystring').stringify(outdata);

    var opt = {
        method: 'POST',
        host: 'micronurse-webserver',
        port: 13000,
        path: '/micronurse/iot/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': outdata.length
        }
    };

    var req = http.request(opt, function (res) {
        if (res.statusCode == 200) {
            res.on('data', function (data) {
                var res_data = JSON.parse(data);
                if(res_data.result_code == 0) {
                    console.log("Return token:" + res_data.token);
                    shared.token = res_data.token;
                    shared.nickname = res_data.nickname;
                    success_cb(res.statusCode, res_data.result_code, res_data.message);
                }else
                    fail_cb(res.statusCode, res_data.result_code, res_data.message);
            });
            res.on('end', function () {
                shared.sessionid = get_cookie(res.headers['set-cookie'], 'sessionid');
                console.log('Return SessionID:' + shared.sessionid);
            })
        }else{
            fail_cb(res.statusCode, -1, 'Server error');
        }
    });

    req.on('error', function (e){
        fail_cb(-1, -10, 'Network error');
    });

    req.write(outdata);
    req.end();
}