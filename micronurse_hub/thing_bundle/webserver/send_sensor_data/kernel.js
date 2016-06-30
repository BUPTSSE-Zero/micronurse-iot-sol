var http = require('http');
console.log('Micro nurse hub - send sensor data kernel');

if(hub_shared.token) {
    var outdata = JSON.parse(IN.json_data);
    //outdata.name = 'micronurse';

    require('../micronurse_api_request').start_request('/v1/iot/report', 'POST', outdata,
      function(error, res, data){
          if (!error && res.statusCode == 201) {
              console.log('Send sensor data successfully.');
          }
      }, hub_shared.token, CONFIG.timeout);
}