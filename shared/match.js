var Team;
// Match
var Match = (function() {
    "use strict";
    
    var cls = function(targetScore) {
        this.teams = [new Team(0), new Team(1)];
        this.targetScore = targetScore;
        this.started = false;
    };
    
    return cls;
}());

if(typeof exports !== 'undefined') { exports.Match = Match; }