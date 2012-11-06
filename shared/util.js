// Various utilities
var Util = (function() {
    var u = {};
    
    u.distanceSquared = function(a, b) {
        return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z);
    };
    
    u.distance = function(a, b) {
        return Math.sqrt(u.distanceSquared(a,b));
    };
    
    return u;
}());

if(typeof exports !== 'undefined') { exports.Util = Util; }