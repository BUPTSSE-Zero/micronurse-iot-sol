console.log("Micro nurse hub - smoketransducer +" + CONFIG.name + " after resume")
shared.smoketransducer.start(function() {
  var increment = Math.random() * 3 * ((Math.random() < 0.5) ? 1 : -1);
  shared.smoketransducer.base_value += increment;
  if(shared.smoketransducer.base_value >= 400)
    shared.smoketransducer.base_value = 400;
  else if(shared.smoketransducer.base_value <= 0)
    shared.smoketransducer.base_value = 0;
  var value = shared.smoketransducer.base_value;
  console.log("[Micro nurse hub - smoketransducer " + CONFIG.name + "]:", value);

  var outdata = {
    value: value.toFixed(0),
    sensor_type: "smoke_transducer",
    name: CONFIG.name,
    timestamp: Date.parse(new Date())
  }

  sendOUT({
    value: outdata.value,
    name: outdata.name,
    timestamp: outdata.timestamp,
    json_data: JSON.stringify(outdata)
  });
}, CONFIG.interval);
