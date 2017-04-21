shared.humidometer_thermometer = {
  timer: null,
  send_timestamp: 0,
  send_interval: parseInt(CONFIG.send_interval),
  timer_interval: null,

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
    this.timer = setInterval(this.callback, this.timer_interval);
  },

  start: function(cb, interval) {
    if(!this.timer)
      this.stop();
    this.callback = cb;
    this.timer_interval = parseInt(interval);
    this.resume();
  }
};

if(shared.humidometer_thermometer.send_interval < 1000)
  shared.humidometer_thermometer.send_interval = 1000;

done();
