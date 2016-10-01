var gpio = require('rpi-gpio');

gpio.setMode(gpio.MODE_BCM);

var pins = [3,5,7,8,10,11,12,13,15,16,18,19,21,22,23,24,26,29,31,32,33,35,36,37,38,40];

pins.forEach(function (i) {
  gpio.setup(i, gpio.DIR_OUT, function () {
    gpio.write(i, true, function (err) {
      console.log('Written to pin ' + i);
      if (err) throw err;
    });
  });
})

// gpio.setup(9, gpio.DIR_OUT, function () {
//   gpio.write(9, false, function (err) {
//     if (err) throw err;
//     console.log('Written to pin 9');
//   });
// });
//
// gpio.setup(10, gpio.DIR_OUT, function () {
//   gpio.write(10, true, function (err) {
//     if (err) throw err;
//     console.log('Written to pin 2');
//   });
// });
