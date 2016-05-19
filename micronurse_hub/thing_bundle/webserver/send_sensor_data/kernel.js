var http = require('http');
console.log('Micro nurse hub - send sensor data kernel');

function requestWithTimeout(options, timeout, callback){
    var timeoutEventId;
    var req = http.request(options, function(res){
        clearTimeout(timeoutEventId);
        callback(res);
    });

    req.on('error', function (e) {
        console.log('Request error: ' + e.message);
        clearTimeout(timeoutEventId);
    });

    req.on('timeout', function(e){
        console.log('Request timeout.');
        if(req.res){
            req.res.abort();
        }
        req.abort();
    });

    timeoutEventId = setTimeout(function(){
        req.emit('timeout');
    }, timeout);

    return req;
}

if(hub_shared.token) {
    var outdata = {
        data: IN.json_data,
        timestamp: Date.parse(new Date())
    };

    var md5 = require('crypto').createHash('md5');
    md5.update(outdata.data);
    md5.update(outdata.timestamp.toString());
    md5.update(hub_shared.token);
    outdata.sign = md5.digest('hex');

    console.log('JSON:' + JSON.stringify(outdata));
    outdata = require('querystring').stringify(outdata);

    var opt = {
        method: 'POST',
        host: 'micronurse-webserver',
        port: 13000,
        path: '/micronurse/iot/report',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'sessionid=' + hub_shared.sessionid,
            'Content-Length': outdata.length
        }
    };

    var req = requestWithTimeout(opt, CONFIG.timeout, function (res) {
        if (res.statusCode == 200) {
            console.log('Return Header:' + JSON.stringify(res.headers));
        }
    });

    req.write(outdata);
    req.end();
}