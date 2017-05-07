shared.pulse_transducer.start(function(){
  var value = shared.pulse_transducer.sensor.read_heartrate();
  switch (value.result){
    case 0:
      heartrate = value.heartrate;
      console.log("Heart rate: ", heartrate);
      var now = Date.parse(new Date());
      sendOUT({
        heart_rate: heartrate,
        timestamp: now,
      });
      shared.pulse_transducer.value_cache = {
        heart_rate: heartrate,
        timestamp: now,
      };
      break;
  }
}, function () {
  if(!shared.pulse_transducer.value_cache)
    return;
  var heartrate = shared.pulse_transducer.value_cache.heart_rate;
  var read_time = shared.pulse_transducer.value_cache.timestamp;
  var outdata = {
    value: heartrate,
    sensor_type: "pulse_transducer",
    timestamp: read_time / 1000
  };
  sendOUT({
    json_data: JSON.stringify(outdata)
  });
  shared.pulse_transducer.value_cache = null;
});