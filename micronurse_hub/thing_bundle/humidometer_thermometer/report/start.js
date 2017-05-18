shared.humidometer_thermometer = {
  read_timer: null,
  read_interval: parseInt(CONFIG.read_interval),
  send_timer: null,
  send_interval: parseInt(CONFIG.send_interval),
  sensor: null,
  value_cache: null,

  read_cb: function() {},
  send_cb: function () {},

  pause: function() {
    if(this.read_timer)
      clearInterval(this.read_timer);
    this.read_timer = null;
    if(this.send_timer)
      clearInterval(this.send_timer);
    this.send_timer = null;
  },

  stop: function() {
    this.pause();
  },

  resume: function() {
    this.read_timer = setInterval(this.read_cb, this.read_interval);
    this.send_timer = setInterval(this.send_cb, this.send_interval);
  },

  start: function(read_cb, send_cb) {
    this.stop();
    this.read_cb = read_cb;
    this.send_cb = send_cb;
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
