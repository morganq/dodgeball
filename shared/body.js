var Util;
// Physical body. Has a position and radius, can detect and resolve collisions.
var Body = (function() {
    "use strict";
    
    var cls = function(center, collisionRadius) {
        this.position = {x:center.x, y:center.y, z:center.z};
        
        // Collisions between objects are circle-tests, for simplicity.
        this.collisionRadius = collisionRadius;
    };
    
    cls.prototype.isOverlapping = function(other) {
        return Util.distanceSquared(this.position, other.position) <= Math.pow(this.collisionRadius + other.collisionRadius, 2);
    };
    
    cls.prototype.resolveCollision = function(other) { 
        if(!this.isOverlapping(other)) { return; }
    };
    
    return cls;
}());

if(typeof exports !== 'undefined') { exports.Body = Body; }