console.log("Micro nurse hub - turgoscope +" + CONFIG.name + " after resume");
shared.turgoscope.start(function() {
  var plus1 = Math.random()*8;
  var plus2 = Math.random()*10;
  var message_temp;
  shared.turgoscope.initial_value1 += plus1*((Math.random()<0.5)?1:-1);
  shared.turgoscope.initial_value2 += plus2*((Math.random()<0.5)?1:-1);
  if(shared.turgoscope.initial_value1 > 110)
      shared.turgoscope.initial_value1 = 110;
  else if(shared.turgoscope.initial_value1 < 50)
      shared.turgoscope.initial_value1 = 50;
     
  if(shared.turgoscope.initial_value2 > 180)
      shared.turgoscope.initial_value2 = 180;
  else if(shared.turgoscope.initial_value2 < 70)
      shared.turgoscope.initial_value2 = 70;
     
  if(shared.turgoscope.initial_value1 <= 90 && shared.turgoscope.initial_value1 >= 50 &&shared.turgoscope.initial_value2 >= 70 && shared.turgoscope.initial_value2 <= 140)
      message_temp = "Safe";
  else
      message_temp = "Warning";
     
  console.log("[Micro nurse hub - turgoscope " + CONFIG.name + "]:", shared.turgoscope.initial_value1 + "/" + shared.turgoscope.initial_value2);

  var outdata = {
    value: parseInt(shared.turgoscope.initial_value1) + "/" + parseInt(shared.turgoscope.initial_value2),
    sensor_type: "turgoscope",
    timestamp: Date.parse(new Date())
  };

  sendOUT({
    value: outdata.value,
    message: message_temp,
    timestamp: outdata.timestamp,
    json_data: JSON.stringify(outdata)
  });
}, CONFIG.interval);