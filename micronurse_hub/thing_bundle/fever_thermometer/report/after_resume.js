shared.fever_thermometer.start(function () {
  var result = shared.fever_thermometer.sensor.read_temperature();
  if(result.result !== 0)
    return;
  var temperature = result.temperature;
  console.log(`Body temperature: ${temperature}`);
  if(temperature < 33 || temperature > 41)
    return;
  var now = Date.parse(new Date());

  shared.fever_thermometer.value_cache = {
    temperature: temperature,
    timestamp: now
  };

  sendOUT({
    temperature: temperature.toFixed(1),
    timestamp: now
  });
});