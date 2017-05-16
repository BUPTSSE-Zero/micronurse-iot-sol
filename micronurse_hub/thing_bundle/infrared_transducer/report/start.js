shared.infrared_transducer= {
  timer: null,
  interval: 100,
  warning_timestamp: 0,
  warning_interval: 2000,
  sensor: null,

  callback: function() {},
  pause: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  },

  stop: function() {
    this.pause();
  },

  resume: function() {
    this.timer = setInterval(this.callback, this.interval);
  },

  start: function(cb, interval) {
    if (this.interval !== interval || this.callback !== cb) {
      this.stop();
      this.callback = cb;
      this.interval = interval;
      if (this.interval <= 100) {
        this.interval = 100;
      }
    }
    this.resume();
  }
};

var m = require('mraa');
shared.infrared_transducer.sensor = new m.Gpio(CONFIG.pir_sensor_pin);
shared.infrared_transducer.sensor.dir(1);

done();
