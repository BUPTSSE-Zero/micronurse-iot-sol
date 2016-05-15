console.log("Micro nurse hub - GPS +" + CONFIG.name + " kernel");
shared.gps.start(function() {
  var x = Math.round((Math.random() * (60-50)+50) * 10000)/10000; 
  console.log("[Micro nurse hub - GPS " + CONFIG.name + "]:", x);
  var y = Math.round((Math.random() * (30-20)+20) * 10000)/10000; 
  console.log("[Micro nurse hub - GPS " + CONFIG.name + "]:", y);
  var mydate = new Date();
  var value = "$GPGGA,"+ mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + "." + mydate.getMilliseconds()
     +",38" + x + ",N,115" + y +",E,"+ "1,08,1.0,20.6,M,,,,0000*35";
  var outdata = {
    value: value,
    sensor_type: "GPS",
    name: CONFIG.name,
    timestamp: Date.parse(mydate)
  }

  sendOUT({
    value: value,
    name: outdata.name,
    timestamp: outdata.timestamp,
    json_data: JSON.stringify(outdata)
  });
}, CONFIG.interval);