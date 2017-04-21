shared.smoke_transducer.start(function() {
  var len = shared.smoke_transducer.mq2_sensor.getSampledWindow(3, shared.smoke_transducer.buffer_len,
    shared.smoke_transducer.buffer);
  if(len){
    var thresh = shared.smoke_transducer.mq2_sensor.findThreshold(shared.smoke_transducer.mq2_thresh, 30,
      shared.smoke_transducer.buffer, len);
    shared.smoke_transducer.mq2_sensor.printGraph(shared.smoke_transducer.mq2_thresh, 5);
  }
}, CONFIG.read_interval);
