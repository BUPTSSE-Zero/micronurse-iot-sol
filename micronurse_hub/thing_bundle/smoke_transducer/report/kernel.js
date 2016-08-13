console.log("Micro nurse hub - smoketransducer +" + CONFIG.name + " kernel")
shared.smoketransducer.start(function() {
  var value = Math.random() * 10000;
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
