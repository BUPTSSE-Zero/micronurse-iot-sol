/**
 * Created by shengyun-zhou on 5/8/16.
 */
var http = require("http");
console.log("Micro nurse hub - send sensor data init");

var outdata={
    data: JSON.stringify({
        phone_number: CONFIG.user_phone_num,
        password: CONFIG.password
    })
};

console.log("JSON:" + JSON.stringify(outdata));
outdata = require('querystring').stringify(outdata);

var opt = {
    method: "POST",
    host: "micronurse-webserver",
    port: 13000,
    path: "/micronurse/iot/login",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": outdata.length
    }
};

var req = http.request(opt, function (res) {
    if (res.statusCode == 200) {
        res.on("data", function (data) {
            console.log('Return login result:' + data);
            var res_data = JSON.parse(data);
            if(res_data.result_code == 0)
                done();
            else
                fail('Login failed.' + res_data.message);
        })
    }else{
        fail('Login failed');
    }
});

req.on('error', function (e){
    fail('Login failed');
});

req.write(outdata);
req.end();
