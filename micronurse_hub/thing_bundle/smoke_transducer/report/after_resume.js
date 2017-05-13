var instance_name = CONFIG.instance_name.toString();

shared.smoke_transducer.start(function() {
  var smoke = shared.smoke_transducer.sensor.read_smoke();
  console.log(instance_name + ': ' + smoke);

  var now = Date.parse(new Date());
  sendOUT({
    smoke: smoke,
    timestamp: now,
  });

  shared.smoke_transducer.value_cache = {
    smoke: smoke,
    timestamp: now
  };
}, function () {
  if(!shared.smoke_transducer.value_cache)
    return;
  var smoke = shared.smoke_transducer.value_cache.smoke;
  var read_time = shared.smoke_transducer.value_cache.timestamp;

  var outdata = {
    value: smoke,
    sensor_type: 'smoke_transducer',
    name: instance_name,
    timestamp: read_time / 1000
  };

  sendOUT({
    json_data: JSON.stringify(outdata)
  });

  shared.smoke_transducer.value_cache = null;
});
