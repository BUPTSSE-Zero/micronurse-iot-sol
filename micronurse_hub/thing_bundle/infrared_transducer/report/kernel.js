console.log("Micro nurse hub -infrared_transducer +" + CONFIG.name + " kernel")
shared.infrared_transducer.start(function() {
  var value = parseInt(Math.random()*10000, 10);
  console.log("[Micro nurse hub -infrared_transducer " + CONFIG.name + "]:", value);
  var outdata = {
    value: true,
    sensor_type: "infrared_transducer",
    name: CONFIG.name,
    timestamp:Date.parse(new Date())
  }
  if(value == 999){
    sendOUT({
      value: true,
      name: outdata.name,
      timestamp: outdata.timestamp,
      json_data: JSON.stringify(outdata)
    });
  }
}, CONFIG.interval);
