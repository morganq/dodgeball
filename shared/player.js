// Logical player object. This isn't a player's avatar, it's a person
// who is connected and playing the game.
var Player = (function () {
    "use strict";
    
    var cls = function (name) {
        this.name = name;

    };
    
    return cls;
}());

if(typeof exports !== 'undefined') { exports.Player = Player; }