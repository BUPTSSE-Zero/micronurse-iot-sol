shared.infrared_transducer.start(function() {
  var warning = !!(shared.infrared_transducer.sensor.read());
  if(warning && !shared.infrared_transducer.warning){
    var now = Date.parse(new Date());
    var outdata = {
      value: 'Warning',
      sensor_type: 'infrared_transducer',
      name: CONFIG.instance_name,
      timestamp: now / 1000
    };
    sendOUT({
      warning: outdata.value,
      timestamp: now,
      json_data: JSON.stringify(outdata)
    });
  }
  shared.infrared_transducer.warning = warning;
}, CONFIG.interval);

