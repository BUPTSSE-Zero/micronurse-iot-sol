console.log("Micro nurse hub - Smoke Transducer " + CONFIG.name + " after resume");
var mq2sensor = require('mq2-sensor');

shared.smoketransducer.start(function() {
  mq2sensor.read_smoke(CONFIG.mq2_sensor_pin, shared.smoketransducer.r0, function (result, smoke) {
    if(result == 0){
      var value = smoke;
      console.log("[Micro nurse hub - Smoke Transducer " + CONFIG.name + "]:", value);
      var outdata = {
        value: value.toFixed(0),
        sensor_type: "smoke_transducer",
        name: CONFIG.name,
        timestamp: Date.parse(new Date())
      };

      sendOUT({
        value: outdata.value,
        name: outdata.name,
        timestamp: outdata.timestamp,
        json_data: JSON.stringify(outdata)
      });
    }
  });
}, CONFIG.interval);
