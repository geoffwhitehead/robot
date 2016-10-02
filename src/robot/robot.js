var gpio = require('rpi-gpio');

gpio.setMode(gpio.MODE_BCM);

// var pins = [3,5,7,8,10,11,12,13,15,16,18,19,21,22,23,24,26,29,31,32,33,35,36,37,38,40];
//
// for (var i = 0; i < pins.length; i++) {
//   gpio.setup(pins[i], gpio.DIR_OUT, function () {
//     gpio.write(pins[i], true, function (err) {
//       console.log('Written to pin ' + pins[i]);
//       if (err) throw err;
//     });
//   });
// }

var run = function() {

  set_motor(0, 1, 0, 1);

}

var set_motor = function(pin_7, pin_8, pin_9, pin_10) {

  arguments.forEach(function(pin){
    gpio.setup(pin, gpio.DIR_OUT, function () {
      gpio.write(pin, pin, function (err) {
          if (err) throw err;
          console.log('Written to pin ' + pin);
      });
    });
  });

};

//   var pin
//   gpio.setup(8, gpio.DIR_OUT, function () {
//     gpio.write(8, false, function (err) {
//       if (err) throw err;
//       console.log('Written to pin 2');
//     });
//   });

// }


module.exports = {
    run : run
}



function Pin (pin, mode) {
    this.pin = pin;
    this.mode = mode;
}

function Motor (pin_pos, pin_neg) {
    this.pins = [];
    var state = false;
    pins.push(new Pin(pin_pos, false));
    pins.push(new Pin(pin_neg, false));

    this.get_state = function(){
        return this.state;
    }

    this.set_state = function(state){
        this.state = state;
    }
}

function Car (left_pos, left_neg, right_pos, right_neg) {

    var motors = [];

    motors.push(new Motor(left_pos, left_neg));
    motors.push(new Motor(right_pos, right_neg));
    
    var left_motor = motors[0];
    var right_motor = motors[1];

    this.forward = function (cb) {
        motors.forEach(function(motor){
            motor.set_state(true);
        })
        if (typeof(cb) === 'function'){
            cb();
        }
    }
}

var car = new Car(7, 8, 9, 10);

car.forward();

