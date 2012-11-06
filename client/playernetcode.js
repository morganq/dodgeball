var jam;
var remotePlayer = function(player) {
	var avatar = player.avatar;
	return function(dt) {
		avatar.body.position = avatar.serverPosition;
	};
};

var localPlayer = function(player) {
	var positionHistory = [];
	var avatar = player.avatar;

	var fixPosition = function() {
		var now = new Date().getTime() / 1000;
		positionHistory.push({
			time: now,
			position: {x: avatar.body.position.x, y: avatar.body.position.y, z: avatar.body.position.z}
		});		

		var i = positionHistory.length - 1;
		while(positionHistory[i].time > now - player.ping * 2 && i > 0) {
			i--;
		}
		var oldPosition = positionHistory[i].position;

		if(avatar.inputs.LEFT ? -1 : 0 + avatar.inputs.RIGHT ? 1 : 0 !== 0) {
			avatar.body.position.y = avatar.body.position.y * 0.97 + avatar.serverPosition.y * 0.03;
		}
		if(avatar.inputs.UP ? -1 : 0 + avatar.inputs.DOWN ? 1 : 0 !== 0) {
			avatar.body.position.x = avatar.body.position.x * 0.97 + avatar.serverPosition.x * 0.03;
		}
		if( Math.abs(oldPosition.y - avatar.serverPosition.y) > 0.5 || Math.abs(oldPosition.x - avatar.serverPosition.x) > 0.5) {
			avatar.body.position.x = avatar.serverPosition.x;
			avatar.body.position.y = avatar.serverPosition.y;
		}
	};

	return function(dt) {
		avatar.inputs.LEFT = jam.Input.buttonDown("LEFT");
		avatar.inputs.RIGHT = jam.Input.buttonDown("RIGHT");
		avatar.inputs.UP = jam.Input.buttonDown("UP");
		avatar.inputs.DOWN = jam.Input.buttonDown("DOWN");
		avatar.update(dt);
		
		fixPosition();
	};
};