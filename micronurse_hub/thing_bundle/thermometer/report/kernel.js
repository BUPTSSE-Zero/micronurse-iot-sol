// e.g. Stepper(3, 3) would generate sequence range as [-3, 3], and 
// it would split [0, 3] to 3 steps
// 0, 1, 2, 3, 2, 1, 0, -1, -2, -3, -2, -1, 0, ... 
// it would start this pattern after delay. It returns 0 if in delay period
function Stepper(range, number_of_splits, delay) {
  this.range = range;
  this.number_of_splits = number_of_splits;
  this.n = 0;
  this.delay = delay || 0;
}

Stepper.prototype.next = function() {
  if (this.delay > 0) {
    this.delay --;
    return 0;
  }

  // totally would be number_of_splits * 4 steps
  if (this.n === this.number_of_splits * 4) {
    this.n = 0;
  }
  var n = this.n ++;
  var f = 1;
  if (n > this.number_of_splits * 2) {
    n = n - this.number_of_splits * 2;
    f = -1;
  }
  return f * this.range * 
    (this.number_of_splits - Math.abs(this.number_of_splits - n)) / this.number_of_splits;
};

var stepper = new Stepper(3, 6, 6);

console.log("Micro nurse hub - Temperature kernel")
shared.sensor.start(function() {
  var value = 25 + stepper.next();
  console.log("[Micro nurse hub - Temperature " + IN.name + "]:", value);
  sendOUT({
    value: value,
    device_type: "thermometer",
    name: IN.name,
    timestamp: Date.parse(new Date())
  });
}, IN.interval);
