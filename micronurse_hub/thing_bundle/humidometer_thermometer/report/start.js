shared.humidometer_thermometer = {
  read_timer: null,
  read_interval: parseInt(CONFIG.read_interval),
  thermometer_send_timestamp: 0,
  humidometer_send_timestamp: 0,
  send_interval: parseInt(CONFIG.send_interval),
  sensor: null,
  thermometer_value_cache: -10000,
  humidometer_value_cache: -10000,

  read_cb: function() {},
  send_cb: function () {},

  pause: function() {
    if(this.read_timer)
      clearInterval(this.read_timer);
    this.read_timer = null;
  },

  stop: function() {
    this.pause();
  },

  resume: function() {
    this.read_timer = setInterval(this.read_cb, this.read_interval);
  },

  start: function(read_cb) {
    this.stop();
    this.read_cb = read_cb;
    this.resume();
  }
};

if(shared.humidometer_thermometer.read_interval < 300)
  shared.humidometer_thermometer.read_interval = 300;
if(shared.humidometer_thermometer.send_interval < 1000)
  shared.humidometer_thermometer.send_interval = 1000;

if(CONFIG.sensor_vendor.toLowerCase() === 'dht11')
  shared.humidometer_thermometer.sensor = new require('dht11-sensor').DHT11(parseInt(CONFIG.sensor_pin));
else if(CONFIG.sensor_vendor.toLowerCase() === 'dht22')
  shared.humidometer_thermometer.sensor = new require('dht22-sensor').DHT22(parseInt(CONFIG.sensor_pin));
else
  fail();

done();
