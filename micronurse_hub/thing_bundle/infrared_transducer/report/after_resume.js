console.log("Micro nurse hub - infrared_transducer +" + CONFIG.name + " after resume");
var pir_sensor = require('pir-sensor');

shared.infrared_transducer.start(function() {
  pir_sensor.read_infrared_signal(CONFIG.pir_sensor_pin, function (result, warning) {
      if(result == 0){
        if(warning && !shared.infrared_transducer.warning){
          var outdata = {
            value: "Warning",
            sensor_type: "infrared_transducer",
            name: CONFIG.name,
            timestamp:Date.parse(new Date())
          };
          sendOUT({
            value: outdata.value,
            name: outdata.name,
            timestamp: outdata.timestamp,
            json_data: JSON.stringify(outdata)
          });
        }
        shared.infrared_transducer.warning = warning;
      }
  })
}, CONFIG.interval);

