var humidometer_instance_name = CONFIG.humidometer_instance_name.toString();
var thermometer_instance_name = CONFIG.thermometer_instance_name.toString();

shared.humidometer_thermometer.start(function() {
  var value = shared.humidometer_thermometer.sensor.read_temperature_humidity();
  switch (value.result){
    case 0:
      var humidity = value.humidity;
      var temperature = value.temperature;
      console.log(`${humidometer_instance_name}: ${humidity}`);
      console.log(`${thermometer_instance_name}: ${temperature}`);

      var now = Date.parse(new Date());
      sendOUT({
        humidity: humidity.toFixed(1),
        temperature: temperature.toFixed(1),
        timestamp: now,
      });

      shared.humidometer_thermometer.value_cache = {
        humidity: humidity,
        temperature: temperature,
        timestamp: now
      };
      break;
    case -1:
      console.log(`DHT11 sensor on GPIO ${CONFIG.dht11_sensor_pin} ACK timeout.`);
      break;
    case -2:
      console.log(`DHT11 sensor on GPIO ${CONFIG.dht11_sensor_pin} read data timeout.`);
      break;
    case -3:
      console.log(`DHT11 sensor on GPIO ${CONFIG.dht11_sensor_pin} checksum error.`)
      break;
  }
}, function () {
  if(!shared.humidometer_thermometer.value_cache)
    return;
  var read_time = shared.humidometer_thermometer.value_cache.timestamp;
  var humidity = shared.humidometer_thermometer.value_cache.humidity;
  var temperature = shared.humidometer_thermometer.value_cache.temperature;

  var humidometer_outdata = {
    value: humidity.toFixed(1),
    sensor_type: 'humidometer',
    name: humidometer_instance_name,
    timestamp: read_time / 1000
  };
  sendOUT({
    json_data: JSON.stringify(humidometer_outdata)
  });
  var thermometer_outdate = {
    value: temperature.toFixed(1),
    sensor_type: 'thermometer',
    name: thermometer_instance_name,
    timestamp: read_time / 1000
  };
  sendOUT({
    json_data: JSON.stringify(thermometer_outdate)
  });
  shared.humidometer_thermometer.value_cache = null;
});
