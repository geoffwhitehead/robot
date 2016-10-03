var gpio = require('rpi-gpio');

function Pin (pin, state, mode, cb) {
    var pin = pin;
    var state = state || false;
    var mode = mode || gpio.DIR_OUT;
    this.pin = pin;
    this.state = state;
    this.mode = mode;

    gpio.setup(pin, mode, cb);

    this.get_state = function(){
        return this.state;
    }

    this.set_state = function(state, cb){
        this.state = state;
        gpio.write(pin, state, cb);
    }
}

function Motor (pin_a, pin_b, cb) {
    var pins = [];
    this.pins = pins;

    var state = false;
    pins.push(new Pin(pin_a, false, gpio.DIR_OUT, function(err) {
        if (err) console.log(err);
        pins.push(new Pin(pin_b, false, gpio.DIR_OUT, function(err) {
             if (err) console.log(err);
             cb();
        }));
    }));

    this.get_state = function(){
       return this.state;
    }

    this.set_state = function(state, cb) {
        this.state = state;
        pins[0].set_state(false, function(){
            pins[1].set_state(state, function(){
                cb();
            });
        });
    }
}

function Car (left_a, left_b, right_a, right_b, cb) {
    gpio.setMode(gpio.MODE_BCM);
    var motors = [];

    motors.push(new Motor(left_a, left_b, function(err){
        if (err) console.log(err);
        motors.push(new Motor(right_a, right_b, function(err){
            if (err) console.log(err);
            cb();
        }));
    }));
    
    var left_motor = motors[0];
    var right_motor = motors[1];

    this.forward = function (cb) {
        console.log("-- activating all motors")

        motors[0].set_state(true, function(){
            motors[1].set_state(true, function(){
                if (typeof(cb) === 'function'){
                    cb();
                }
            })
        });
    }

    this.stop = function (cb) {
        console.log("-- stopping all motors")
        motors[0].set_state(false, function(){
            motors[1].set_state(false, function(){
                if (typeof(cb) === 'function'){
                    cb();
                }
            })
        });
    }
}

var run = function() {

    var car = new Car(7, 8, 9, 10, function(err){
        
        car.forward(function (err) {
        if (err) console.log(err);
            setTimeout(function () {
                car.stop(function () {
                    console.log('done!');
                });
            }, 3000)
        });

    });
}

module.exports = {
    run : run
}
