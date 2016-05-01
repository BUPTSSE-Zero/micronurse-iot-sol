console.log("Micro nurse hub - Humidiometer A kernel")
shared.humidiometer.start(function() {
  var value = Math.random() * 100;
  console.log("[Micro nurse hub - Humidiometer A]:", value);
  sendOUT({
    humidity: value
  });
}, IN.interval);
