var five = require("johnny-five");

var stdin = process.openStdin();

var board = new five.Board({ port: process.argv[2] });

var l_motor = r_motor = null;
var max_speed = 250;
var stop = false;

board.on("ready", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  l_motor = new five.Motor({ pins: { pwm: 6, dir: 7 } });
  r_motor = new five.Motor({ pins: { pwm: 5, dir: 4 } });

  var proximity = new five.Proximity({
    freq: 500,
    controller: "HCSR04",
    pin: 10
  });

  console.info("Robot set up. Autonomous mode active! `Space` to stop!");
  l_motor.reverse(max_speed);
  r_motor.forward(max_speed);
  manualOverride = false;

  proximity.on("data", function () {
    if (stop || manualOverride) {
      l_motor.stop();
      r_motor.stop();
      return;
    }

    if (this.cm < 40) {
      l_motor.forward(150);
      r_motor.forward(150);
    } else {
      l_motor.reverse(max_speed);
      r_motor.forward(max_speed);
    }
  });

});

stdin.on('keypress', function (chunk, key) {
  if (key) {

    // global key events
    switch (key.name) {
      case "r":
        max_speed = 250
        console.log("Speed reset!");
        break;
    }

    // mode-specific keys
    if (!manualOverride) {
      switch (key.name) {
        case "space":
          stop = !stop;
          break;
        case "up":
          max_speed += 10;
          console.log("Speed++ =", max_speed);
          break;
        case "down":
          max_speed -= 10;
          console.log("Speed-- =", max_speed);
          break;
        case "m":
          manualOverride = true;
          console.log("Manual override engaged!");
          break;
      }
    } else {
      switch (key.name) {
        case "up":
          l_motor.reverse(max_speed);
          r_motor.forward(max_speed);
          break;
        case "down":
          r_motor.reverse(max_speed);
          l_motor.forward(max_speed);
          break;
        case "left":
          l_motor.forward(50);
          r_motor.forward(50);
          break;
        case "right":
          r_motor.reverse(50);
          l_motor.reverse(50);
          break;
        case "space":
          l_motor.stop();
          r_motor.stop();
          break;
        case "a":
          console.log('Manual override disengaged. Autonomous mode active!')
          manualOverride = false;
          break;
      }
    }
  }
});
