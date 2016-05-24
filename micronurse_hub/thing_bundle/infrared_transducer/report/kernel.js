console.log("Micro nurse hub -infrared_transducer +" + CONFIG.name + " kernel")
shared.infrared_transducer.start(function() {
  var value = parseInt(Math.random()*10, 10);
  console.log("[Micro nurse hub -infrared_transducer " + CONFIG.name + "]:", value);
  var outdata = {
    value: true,
    sensor_type: "infrared_transducer",
    name: CONFIG.name,
    timestamp:Date.parse(new Date())
  }
  if(value==9){
    sendOUT({
      value: "Warning",
      name: outdata.name,
      timestamp: outdata.timestamp,
      json_data: JSON.stringify(outdata)
    });
  }
  else{
    sendOUT({
      value: "Safe",
      name: outdata.name,
      timestamp: outdata.timestamp,
      json_data: JSON.stringify(outdata)
    });
  }
}, CONFIG.interval);

