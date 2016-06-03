console.log("Micro nurse hub - Bloodpressure init");

shared.turgoscope = {
  timer: null,
  interval: 3000,
  initial_value1: 70,
  initial_value2: 100,
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


done();
