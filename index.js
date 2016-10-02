var robot = include("./src/robot/robot.js");
var web = include("./src/web/index.js");


web.run(8080);
robot.run();
