console.log("Micro nurse hub - humidometer +" + CONFIG.name + " after resume");
var dht11sensor = require('dht11-sensor');

shared.humidiometer.start(function() {
  dht11sensor.read_temperature_humidity(CONFIG.dht11_sensor_pin, function (result, tempurature, humidity) {
    if(result == 0){
      console.log("[Micro nurse hub - humidometer " + CONFIG.name + "]:", humidity);

      var outdata = {
        value: humidity.toFixed(2),
        sensor_type: "humidometer",
        name: CONFIG.name,
        timestamp: Date.parse(new Date())
      };

      sendOUT({
        value: outdata.value,
        name: outdata.name,
        timestamp: outdata.timestamp,
        json_data: JSON.stringify(outdata)
      });
    }else if(result == 1){
      console.log('Humidometer ACK timeout.')
    }else if(result == 2){
      console.log('Humidometer Read data timeout.')
    }else if(result == 3){
      console.log('Humidometer checksum error.')
    }
  });
}, CONFIG.interval);
