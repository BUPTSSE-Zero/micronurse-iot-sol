var dht11sensor = require('dht11-sensor');

shared.humidometer_thermometer.start(function() {
  dht11sensor.read_temperature_humidity(CONFIG.dht11_sensor_pin, function (result, tempurature, humidity) {
    if(result == 0){
      console.log(CONFIG.humidometer_instance_name.toString() + ': ' + humidity);
      console.log(CONFIG.thermometer_instance_name.toString() + ': ' + tempurature);

      var now = Date.parse(new Date());
      sendOUT({
        humidity: humidity.toFixed(1),
        temperature: tempurature.toFixed(1),
        timestamp: now,
      });

      if(now - shared.humidometer_thermometer.send_timestamp >= parseInt(CONFIG.send_interval)){
        shared.humidometer_thermometer.send_timestamp = now;
        var humidometer_outdata = {
          value: humidity.toFixed(1),
          sensor_type: "humidometer",
          name: CONFIG.humidometer_instance_name,
          timestamp: now / 1000
        };
        sendOUT({
          json_data: JSON.stringify(humidometer_outdata)
        });
        var thermometer_outdate = {
          value: tempurature.toFixed(1),
          sensor_type: "thermometer",
          name: CONFIG.thermometer_instance_name,
          timestamp: now / 1000
        };
        sendOUT({
          json_data: JSON.stringify(thermometer_outdate)
        });
      }
    }else if(result == -1){
      console.log('DHT11 sensor on GPIO ' + CONFIG.dht11_sensor_pin + ' ACK timeout.');
    }else if(result == -2){
      console.log('DHT11 sensor on GPIO ' + CONFIG.dht11_sensor_pin + ' read data timeout.');
    }else if(result == -3){
      console.log('DHT11 sensor on GPIO ' + CONFIG.dht11_sensor_pin + ' checksum error.');
    }
  });
}, CONFIG.read_interval);
