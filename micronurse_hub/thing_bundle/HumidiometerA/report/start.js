console.log("Micro nurse hub - Humidiometer A init");

shared.humidiometer = {
  timer: null,
  interval: 2000,
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
      if (this.interval <= 500) {
        this.interval = 500;
      }
    }
    this.resume();
  }
};

done();
