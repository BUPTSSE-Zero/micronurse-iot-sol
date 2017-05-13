var ds18b20 = require('ds18b20-sensor');

shared.fever_thermometer = {
  read_timer: null,
  read_interval: parseInt(CONFIG.read_interval),
  send_interval: 1000,
  send_timestamp: 0,
  sensor: new ds18b20.DS18B20(),
  value_cache: null,

  read_cb: function() {},

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

if(shared.fever_thermometer.read_interval < 500)
  shared.fever_thermometer.read_interval = 500;

done();