var robot = {
	x: 0,
	y: 0,
	direction: "NORTH"
};

var tabletop = {
	unitX: 5,
	unitY: 5
};

function Command(robot, tabletop, div) {
	this.robot = robot;
	this.tabletop = tabletop;
	this.placable = function(){
		return robot.x < tabletop.unitX - 1 && robot.y < tabletop.unitY -1;
	};
	this.rotate = function(offset) {
		var direction = {"NORTH":0,"EAST":90,"SOUTH":180,"WEST":270,0:"NORTH",90:"EAST",180:"SOUTH",270:"WEST"},
			index = robot.direction,
			pointer;
		if (direction[index] + offset < 0) {
			pointer = direction[270];
		} else if (direction[index] + offset > 270) {
			pointer = direction[0];
		} else {
			pointer = direction[direction[index] + offset];
		}
		robot.direction = pointer;
	};
	this.exec = function(command) {
		if (this.placable() || (!this.placable() && command != "MOVE" && command != "RIGHT" && command != "LEFT" && command != "REPORT"))
		{
			div.innerHTML += command + "<br>";	
		}
		switch(true) {
			case /^PLACE\s\d,\d,(NORTH|SOUTH|WEST|EAST)$/.test(command):
				var args = command.split(/\s|,/);
				robot.x = parseInt(args[1]);
				robot.y = parseInt(args[2]);
				robot.direction = args[3];
			break;
			case "MOVE" == command:
				switch (robot.direction) {
					case "NORTH":
						robot.y == tabletop.unitY - 1 ? tabletop.unitY : robot.y += 1;
					break;
					case "SOUTH":
						robot.y == 0 ? 0 : robot.y -= 1;
					break;
					case "WEST":
						robot.x == 0 ? 0 : robot.x -= 1;
					break;
					case "EAST":
						robot.x == tabletop.unitY - 1 ? tabletop.unitX : robot.x += 1;
					break;
				}
			break;
			case "LEFT" == command:
				this.rotate(-90);
			break;
			case "RIGHT" == command:
				this.rotate(90);
			break;
			case "REPORT" == command:
				if (this.placable()) {
					div.innerHTML += "<br>Expected output: <br><br> " + robot.x + "," + robot.y + "," + robot.direction + "<br><br>";
				}
			break;
		}
	};
}

window.onload=function()
{
	var div = document.getElementById("main"),
		command = new Command(robot,tabletop, div);
	command.exec("PLACE 0,0,NORTH");
	command.exec("MOVE");
	command.exec("REPORT");

	command.exec("PLACE 0,0,NORTH");
	command.exec("LEFT");
	command.exec("REPORT");

	command.exec("PLACE 1,2,EAST");
	command.exec("MOVE");
	command.exec("MOVE");
	command.exec("LEFT");
	command.exec("MOVE");
	command.exec("REPORT");
}






