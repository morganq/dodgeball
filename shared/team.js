// A team in a match of dodgeball.
var Team = (function() {
    "use strict";
    
    var cls = function(id) {
        this.id = id;
        this.points = 0;
        this.numPlayers = 0;
    };
    
    // The team determines where the avatar spawns. When an avatar is constructed, this is called.
    // Court dimensions: 25m by 15m by 15m
    cls.prototype.nextSpawn = function(player) {
        var position = {
            x: (this.id === 0) ? 5 : 20,
            y: this.numPlayers * 3 + 1.5,
            z: 1 };
        this.numPlayers += 1;
        return position;
    };
    
    return cls;
}());

if(typeof exports !== 'undefined') { exports.Team = Team; }