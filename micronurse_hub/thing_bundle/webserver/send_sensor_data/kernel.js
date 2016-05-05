var http = require("http");
console.log("Micro nurse hub - send sensor data kernel");

function requestWithTimeout(options, timeout, callback){
    var timeoutEventId;
    var req = http.request(options, function(res){
        clearTimeout(timeoutEventId);
        callback(res);
    });

    req.on('error', function (e) {
        console.log("Request error: " + e.message);
        clearTimeout(timeoutEventId);
    });

    req.on('timeout', function(e){
        console.log("Request timeout.");
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

var outdata={
  data: IN.json_data
};

console.log("JSON:" + JSON.stringify(outdata));
outdata = require('querystring').stringify(outdata);

var opt = {
    method: "POST",
    host: "micronurse-webserver",
    port: 12080,
    path: "/micronurse-webserver/ReportServlet",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": outdata.length
    }
};

var req = requestWithTimeout(opt, CONFIG.timeout, function (res) {
    if (res.statusCode == 200) {
        console.log("Return header:" + JSON.stringify(res.headers));
    }
});

req.write(outdata);
req.end();