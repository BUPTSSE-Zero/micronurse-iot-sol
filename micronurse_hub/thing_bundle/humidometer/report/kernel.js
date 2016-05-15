console.log("Micro nurse hub - humidometer +" + CONFIG.name + " kernel")
shared.humidiometer.start(function() {
  var delta = Math.random() * 2 * ((Math.random() < 0.5) ? 1 : -1);
  shared.humidiometer.base_value += delta;
  if(shared.humidiometer.base_value < 0)
      shared.humidiometer.base_value = 0;
  else if(shared.humidiometer.base_value > 100)
      shared.humidiometer.base_value = 100;
  console.log("[Micro nurse hub - humidometer " + CONFIG.name + "]:", shared.humidiometer.base_value);

  var outdata = {
    value: shared.humidiometer.base_value.toFixed(2),
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
