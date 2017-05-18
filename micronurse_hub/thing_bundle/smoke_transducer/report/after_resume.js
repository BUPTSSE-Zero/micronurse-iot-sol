var instance_name = CONFIG.instance_name.toString();

shared.smoke_transducer.start(function() {
  var smoke = shared.smoke_transducer.sensor.read_smoke();
  console.log(`${instance_name}: ${smoke}`);

  var now = Date.parse(new Date());
  sendOUT({
    smoke: smoke,
    timestamp: now,
  });

  if(smoke !== shared.smoke_transducer.value_cache &&
    now - shared.smoke_transducer.send_timestamp >= shared.smoke_transducer.send_interval){
    var outdata = {
      value: smoke,
      sensor_type: 'smoke_transducer',
      name: instance_name,
      timestamp: now / 1000
    };

    sendOUT({
      json_data: JSON.stringify(outdata)
    });
    shared.smoke_transducer.value_cache = smoke;
    shared.smoke_transducer.send_timestamp = now;
  }
});
