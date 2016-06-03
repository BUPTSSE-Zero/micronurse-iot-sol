console.log("Micro nurse hub -infrared_transducer +" + CONFIG.name + " kernel")
shared.infrared_transducer.start(function() {
  var value = parseInt(Math.random() * 50, 10);
  console.log("[Micro nurse hub -infrared_transducer " + CONFIG.name + "]:", value);
  var outdata = {
    value1: "Warning",
    value2: "Safe",
    sensor_type: "infrared_transducer",
    name: CONFIG.name,
    timestamp:Date.parse(new Date())
  }
  if(value==9){
    sendOUT({
      value: outdata.value1,
      name: outdata.name,
      timestamp: outdata.timestamp,
      json_data: JSON.stringify(outdata)
    });
  }
  else{
     sendOUT({
      value: outdata.value2,
      name: outdata.name,
      timestamp: outdata.timestamp,
      json_data: JSON.stringify(outdata)
    });
 }
}, CONFIG.interval);

