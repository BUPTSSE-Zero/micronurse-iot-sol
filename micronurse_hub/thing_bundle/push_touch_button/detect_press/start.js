shared.push_press_button = {
  timer: null,
  read_interval: parseInt(CONFIG.detect_interval),
  press: false,
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

  start: function(cb) {
    this.stop();
    this.callback = cb;
    this.resume();
  }
};

if(shared.push_press_button.read_interval < 100)
  shared.push_press_button.read_interval = 100;

var m = require('mraa');
shared.push_press_button.sensor = new m.Gpio(CONFIG.sensor_pin);
shared.push_press_button.sensor.dir(1);

done();
