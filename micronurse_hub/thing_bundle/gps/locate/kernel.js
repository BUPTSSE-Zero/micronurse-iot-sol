console.log("Micro nurse hub - GPS +" + CONFIG.name + " kernel");
shared.gps.start(function() {
  var delta_x = Math.random() / 10000 * ((Math.random() < 0.5) ? 1 : -1);
  var delta_y = Math.random() / 10000 * ((Math.random() < 0.5) ? 1 : -1);
  shared.gps.current_x += delta_x;
  shared.gps.current_y += delta_y;
  var value = shared.gps.current_x + ',' + shared.gps.current_y;
  console.log("[Micro nurse hub - GPS " + CONFIG.name + "]:" + value);
  var mydate = new Date();
  //var value = "$GPGGA,"+ mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + "." + mydate.getMilliseconds()
  //   +",38" + x + ",N,115" + y +",E,"+ "1,08,1.0,20.6,M,,,,0000*35";
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