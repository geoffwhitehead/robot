var gpio = require('rpi-gpio');
var RSVP = require('rsvp');

function Pin (pin, state, mode, cb) {
    this.pin = pin;
    this.state = state || false;
    this.mode = mode || gpio.DIR_OUT;

    gpio.setup(pin, mode, cb);

    this.get_state = function(){
        return this.state;
    }

    this.set_state = function(state, cb){
        this.state = state;
        gpio.write(pin, state, cb);
    }
}

function Motor (pin_a, pin_b) {
    var pins = [];
    this.pins = pins;

    var state = false;
    pins.push(new Pin(pin_a));
    pins.push(new Pin(pin_b));

    this.get_state = function(){
       return this.state;
    }

    this.set_state = function(state) {
        var promise = new RSVP.Promise(function(resolve, reject){
            console.log("acivating pins");
            this.state = state;
            pins[0].set_state(false);
            pins[1].set_state(state);
            console.log("done acivating pins");
        });
        return promise;
    }
}

function Car (left_a, left_b, right_a, right_b) {
    gpio.setMode(gpio.MODE_BCM);
    var motors = [];

    motors.push(new Motor(left_a, left_b));
    motors.push(new Motor(right_a, right_b));
    
    var left_motor = motors[0];
    var right_motor = motors[1];

    this.forward = function (cb) {
        console.log("-- activating all motors")
        motors.forEach(function(motor){
            motor.set_state(true);
        });
        if (typeof(cb) === 'function'){
            cb();
        }
    }

    this.stop = function (cb) {
        console.log("-- stopping all motors")
        motors.forEach(function(motor){
            motor.set_state(false);
        });
        if (typeof(cb) === 'function'){
            cb();
        }
    }
}

var run = function() {

    var car = new Car(7, 8, 9, 10);

    car.forward(function (err) {
        if (err) console.log(err);
        setTimeout(function () {
            car.stop(function () {
                console.log('done!');
            });
        }, 3000)
    });

}



module.exports = {
    run : run
}
