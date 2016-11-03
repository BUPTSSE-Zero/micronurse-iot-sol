console.log("Micro nurse hub - pulseTransduce +" + CONFIG.name + " after resume");
var heartrate_sensor = require('heartrate-sensor');

shared.pulseTransduce.start(function(){
    var message_temp;

    heartrate_sensor.read_heart_rate(CONFIG.heartrate_sensor_pin, function (heartrate) {
       if(heartrate > 0){
           if(heartrate >= 50 && heartrate <= 120)
               message_temp = "Safe";
           else
               message_temp = "Warning";
           console.log("Micro nurse hub - pulseTransducer " + CONFIG.name + "]:", heartrate);

           var outdata = {
               value:heartrate,
               sensor_type:"pulse_transducer",
               timestamp:Date.parse(new Date())
           };

           sendOUT({
               value:outdata.value,
               message:message_temp,
               timestamp:outdata.timestamp,
               json_data:JSON.stringify(outdata)
           });
       }
    });
}, CONFIG.interval);