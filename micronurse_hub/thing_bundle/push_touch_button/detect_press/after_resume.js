shared.push_press_button.start(function() {
  var press = !!(shared.push_press_button.sensor.read());
  if(press && !shared.push_press_button.press){
    sendOUT({
      press_touch: true
    })
  }
  shared.push_press_button.press = press;
});

