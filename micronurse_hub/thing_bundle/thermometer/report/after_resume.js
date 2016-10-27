console.log("Micro nurse hub - Temperature after resume");
var dht11sensor = require('dht11-sensor');

shared.thermometer.start(function() {
  dht11sensor.read_temperature_humidity(CONFIG.dht11_sensor_pin, function (result, tempurature, humidity) {
    if(result == 0){
      var value = tempurature;
      console.log('[Micro nurse hub - Temperature ' + CONFIG.name + ']:', value);

      var outdata = {
        value: value,
        sensor_type: 'thermometer',
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
      console.log('Thermometer ACK timeout.')
    }else if(result == 2){
      console.log('Thermometer Read data timeout.')
    }else if(result == 3){
      console.log('Thermometer checksum error.')
    }
  });
}, CONFIG.interval);
