var heartrate_sensor = require('heartrate-sensor');

shared.pulse_transducer.start(function(){
  heartrate_sensor.read_heart_rate(CONFIG.heartrate_sensor_pin, function (heartrate) {
    if(heartrate > 0){
      console.log("Heart rate: ", heartrate);
      var now = Date.parse(new Date());
      sendOUT({
        heart_rate: heartrate,
        timestamp: now,
      });

      if(now - shared.pulse_transducer.send_timestamp >= shared.pulse_transducer.send_interval){
        shared.pulse_transducer.send_timestamp = now;
        var outdata = {
          value: heartrate,
          sensor_type: "pulse_transducer",
          timestamp: now / 1000
        };
        sendOUT({
          json_data: JSON.stringify(outdata)
        });
      }
     }
  });
}, CONFIG.read_interval);