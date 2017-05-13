/**
 * Created by shengyun-zhou on 17-5-13.
 */

if(IN.send_trigger){
  if(shared.fever_thermometer.value_cache){
    var now = Date.parse(new Date());
    if(now - shared.fever_thermometer.send_timestamp >= shared.fever_thermometer.send_interval){
      shared.fever_thermometer.send_timestamp = now;

      var temperature = shared.fever_thermometer.value_cache.temperature;
      var read_time = shared.fever_thermometer.value_cache.timestamp;

      var outdata = {
        value: temperature,
        sensor_type: 'fever_thermometer',
        timestamp: read_time / 1000
      };

      sendOUT({
        json_data: JSON.stringify(outdata)
      });
      shared.fever_thermometer.value_cache = null;
    }
  }
}
