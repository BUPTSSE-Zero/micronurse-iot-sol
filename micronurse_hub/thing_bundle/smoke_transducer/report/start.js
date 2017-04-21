shared.smoke_transducer = {
  timer: null,
  send_timestamp: 0,
  send_interval: parseInt(CONFIG.send_interval),
  timer_interval: null,
  mq2_sensor: null,
  mq2_thresh: null,
  buffer: null,
  buffer_len: 64,

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
    this.timer = setInterval(this.callback, this.send_interval);
  },
    
  start: function(cb, interval) {
    if(!this.timer)
      this.stop();
    this.callback = cb;
    this.timer_interval = parseInt(interval);
    this.resume();
  }
};

if(shared.smoke_transducer.send_interval < 1000)
  shared.smoke_transducer.send_interval = 1000;

var upm_mq2 = require("jsupm_gas");
shared.smoke_transducer.mq2_sensor = new upm_mq2.MQ2(0);

shared.smoke_transducer.mq2_thresh = new upm_mq2.thresholdContext;
shared.smoke_transducer.mq2_thresh.averageReading = 0;
shared.smoke_transducer.mq2_thresh.runningAverage = 0;
shared.smoke_transducer.mq2_thresh.averagedOver = 2;
shared.smoke_transducer.buffer = upm_mq2.uint16Array(shared.smoke_transducer.buffer_len);

done();
