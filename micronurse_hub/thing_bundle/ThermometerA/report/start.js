console.log("TA init");

shared.sensor = {
  timer: null,
  interval: 3000,
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
