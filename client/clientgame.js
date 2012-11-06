var client;
var match;
var players;
var net;
var me;

jam.includeModule("Debug");

(function() {
    client = {};
    client.start = function() {
        var game = jam.Game(320, 200, document.body);

        var bg = jam.Sprite(0, 0); bg.setImage("images/background.png");
        game.add(bg);

        game.update = jam.extend(function() {
            if(jam.Input.justPressed("~")) { jam.Debug.showLog = !jam.Debug.showLog; }

            if(jam.Input.justPressed("LEFT")) { net.sendInput("LEFT", true); }
            if(jam.Input.justReleased("LEFT")) { net.sendInput("LEFT", false); }
            if(jam.Input.justPressed("RIGHT")) { net.sendInput("RIGHT", true); }
            if(jam.Input.justReleased("RIGHT")) { net.sendInput("RIGHT", false); }
            if(jam.Input.justPressed("UP")) { net.sendInput("UP", true); }
            if(jam.Input.justReleased("UP")) { net.sendInput("UP", false); }
            if(jam.Input.justPressed("DOWN")) { net.sendInput("DOWN", true); }
            if(jam.Input.justReleased("DOWN")) { net.sendInput("DOWN", false); }
            if(jam.Input.justPressed("X")) { net.sendInput("JUMP", true); }
            
            var makePlayer = function(p) {
                if(p.avatar !== undefined && p.avatar.sprite === undefined) {
                    var spr = jam.Sprite(50,50);
                    p.avatar.sprite = spr;
                    spr.setImage("images/superballtrail.png");
                    spr.update = jam.extend(spr.update, function(dt){
                        if(p.avatar.netUpdate !== undefined) { p.avatar.netUpdate(dt); }
                        spr.x = p.avatar.body.position.x / 25 * 320;
                        spr.y = p.avatar.body.position.y / 15 * 200 - p.avatar.body.position.z * 2;
                    });
                    game.add(spr);
                    spr.setLayer(1);
                }
            };
            
            for(var name in players) {
                makePlayer(players[name]);
            }
            
        }, game.update);

        game.run();
    };
}());