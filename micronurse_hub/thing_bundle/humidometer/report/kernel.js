console.log("Micro nurse hub - humidometer +" + CONFIG.name + " kernel")
shared.humidiometer.start(function() {
  var value = Math.random() * 100;
  console.log("[Micro nurse hub - humidometer " + CONFIG.name + "]:", value);

  var outdata = {
    value: value,
    sensor_type: "humidometer",
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
