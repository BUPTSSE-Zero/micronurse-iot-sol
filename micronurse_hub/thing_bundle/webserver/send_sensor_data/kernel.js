var http = require('http');
console.log('Micro nurse hub - send sensor data kernel');

function requestWithTimeout(outdata, timeout, callback){
    var timeoutEventId;
    var req = require('../micronurse_api_request').get_request('/micronurse/iot/report', outdata,
                      function(res){
                          clearTimeout(timeoutEventId);
                          callback(res);
                      }, hub_shared.token, hub_shared.sessionid);

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
    };

    var req = requestWithTimeout(outdata, CONFIG.timeout, function (res) {
        if (res.statusCode == 200) {
            console.log('Return Header:' + JSON.stringify(res.headers));
        }
    });

    req.write(require('querystring').stringify(outdata));
    req.end();
}