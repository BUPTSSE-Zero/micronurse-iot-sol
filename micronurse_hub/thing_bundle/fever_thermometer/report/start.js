console.log("Micro nurse hub - feverThermometer init");

shared.feverThermometer = {
  timer: null,
  interval: 5000,
  base_value: 35 + Math.random() * 2,
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
      if (this.interval <= 1000) {
        this.interval = 1000;
      }
    }
    this.resume();
  }
};

done();