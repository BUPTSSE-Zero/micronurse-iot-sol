var humidometer_instance_name = CONFIG.humidometer_instance_name.toString();
var thermometer_instance_name = CONFIG.thermometer_instance_name.toString();

shared.humidometer_thermometer.start(function() {
  var value = shared.humidometer_thermometer.sensor.read_temperature_humidity();
  switch (value.result){
    case 0:
      var humidity = value.humidity.toFixed(1);
      var temperature = value.temperature.toFixed(1);
      console.log(`${humidometer_instance_name}: ${humidity}`);
      console.log(`${thermometer_instance_name}: ${temperature}`);

      var now = Date.parse(new Date());
      sendOUT({
        humidity: humidity,
        temperature: temperature,
        timestamp: now,
      });

      if(Math.abs(humidity - shared.humidometer_thermometer.humidometer_value_cache) >= 1.0){
        if(now - shared.humidometer_thermometer.humidometer_send_timestamp >= shared.humidometer_thermometer.send_interval) {
          send_humidity_json(humidity, now);
          shared.humidometer_thermometer.humidometer_value_cache = humidity;
          shared.humidometer_thermometer.humidometer_send_timestamp = now;
        }
      }

      if(Math.abs(temperature - shared.humidometer_thermometer.thermometer_value_cache) >= 0.5){
        if(now - shared.humidometer_thermometer.thermometer_send_timestamp >= shared.humidometer_thermometer.send_interval) {
          send_temperature_json(temperature, now);
          shared.humidometer_thermometer.thermometer_value_cache = temperature;
          shared.humidometer_thermometer.thermometer_send_timestamp = now;
        }
      }
      break;
    case -1:
      console.log(`DHT11/22 sensor on GPIO ${CONFIG.sensor_pin} ACK timeout.`);
      break;
    case -2:
      console.log(`DHT11/22 sensor on GPIO ${CONFIG.sensor_pin} read data timeout.`);
      break;
    case -3:
      console.log(`DHT11/22 sensor on GPIO ${CONFIG.sensor_pin} checksum error.`)
      break;
  }
});

function send_temperature_json(temperature, read_time) {
  var thermometer_outdate = {
    value: temperature,
    sensor_type: 'thermometer',
    name: thermometer_instance_name,
    timestamp: read_time / 1000
  };
  sendOUT({
    json_data: JSON.stringify(thermometer_outdate)
  });
}

function send_humidity_json(humidity, read_time) {
  var humidometer_outdata = {
    value: humidity,
    sensor_type: 'humidometer',
    name: humidometer_instance_name,
    timestamp: read_time / 1000
  };
  sendOUT({
    json_data: JSON.stringify(humidometer_outdata)
  });
}

