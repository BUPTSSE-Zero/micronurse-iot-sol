shared.infrared_transducer.start(function() {
  var warning = !!(shared.infrared_transducer.pin.read());
  if(warning && !shared.infrared_transducer.warning){
    var now = new Date();
    var outdata = {
      value: "Warning",
      sensor_type: "infrared_transducer",
      name: CONFIG.instance_name,
      timestamp: Date.parse(now) / 1000
    };
    sendOUT({
      value: outdata.value,
      name: outdata.name,
      timestamp: Date.parse(now),
      json_data: JSON.stringify(outdata)
    });
  }
  shared.infrared_transducer.warning = warning;
}, CONFIG.interval);

