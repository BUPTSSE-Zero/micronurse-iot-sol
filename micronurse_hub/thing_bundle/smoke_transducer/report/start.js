var mq2 = require('mq2-sensor');

shared.smoke_transducer = {
  read_timer: null,
  read_interval: parseInt(CONFIG.read_interval),
  send_timestamp: 0,
  send_interval: parseInt(CONFIG.send_interval),
  sensor: new mq2.MQ2(CONFIG.mq2_sensor_pin),
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

  start: function(read_cb, send_cb) {
    this.stop();
    this.read_cb = read_cb;
    this.resume();
  }
};

if(shared.smoke_transducer.read_interval < 300)
  shared.smoke_transducer.read_interval = 300;
if(shared.smoke_transducer.send_interval < 1000)
  shared.smoke_transducer.send_interval = 1000;

done();
