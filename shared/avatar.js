var Body;
// Avatar. A dodgeball player object. 
var Avatar = (function() {
    "use strict";
    
    var SPEED = 4.0;
    var JUMPFORCE = 7.0;
    var GRAVITY = -9.8;    
    
    var cls = function(team) {
        this.team = team;
        
        this.body = new Body(team.nextSpawn(), 0.5);
        this.inputs = {"LEFT":false, "RIGHT":false, "UP":false, "DOWN":false, "JUMP":false};        
    };
    
    cls.prototype.update = function(dt) {
        // Convert inputs into motion
        var vx = this.inputs.LEFT ? -1 : 0 + this.inputs.RIGHT  ? 1 : 0;
        var vy = this.inputs.UP ? -1 : 0 + this.inputs.DOWN  ? 1 : 0;
        // If diagonal, multiply by sqrt(2)/2
        if(vx !== 0 && vy !== 0) {  
            vx *= 0.717;
            vy *= 0.717;
        }
        
        this.body.position.x += vx * SPEED * dt;
        this.body.position.y += vy * SPEED * dt;
        
    };
    
    return cls;
}());

if(typeof exports !== 'undefined') { exports.Avatar = Avatar; }