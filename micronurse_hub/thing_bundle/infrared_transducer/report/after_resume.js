shared.infrared_transducer.start(function() {
  var warning = !!(shared.infrared_transducer.sensor.read());
  if(warning){
    var now = Date.parse(new Date());
    if(now - shared.infrared_transducer.warning_timestamp < shared.infrared_transducer.warning_interval)
      return;
    shared.infrared_transducer.warning_timestamp = now;
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
}, CONFIG.interval);

