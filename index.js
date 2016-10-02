var robot = require("./src/robot/robot.js");
var web = require("./src/web/index.js");


web.run(8080);
robot.run();
