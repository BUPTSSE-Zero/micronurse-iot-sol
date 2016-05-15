console.log("Micro nurse hub - turgoscope +" + CONFIG.name + " kernel")
shared.turgoscope.start(function() {
  var value1 = Math.random() * 150 + 50;
  var value2 = Math.random() * 60 + 40;
  console.log("[Micro nurse hub - turgoscope " + CONFIG.name + "]:", value1 + "/" + value2);

  var outdata = {
    value: value1.toFixed(2) + '/' + value2.toFixed(2),
    sensor_type: "turgoscope",
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