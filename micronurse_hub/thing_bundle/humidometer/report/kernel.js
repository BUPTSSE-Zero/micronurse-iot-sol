console.log("Micro nurse hub - humidometer +" + IN.name + " kernel")
shared.humidiometer.start(function() {
  var value = Math.random() * 100;
  console.log("[Micro nurse hub - humidometer " + IN.name + "]:", value);
  sendOUT({
    value: value,
    device_type: "humidometer",
    name: IN.name,
    timestamp: Date.parse(new Date())
  });
}, IN.interval);
