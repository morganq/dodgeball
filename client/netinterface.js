var client;
var match;
var players;
var me;
var config = {host:'localhost', port:3333};

var net = (function() {
    $(document).ready(function(){
        players = {};
        $("#connect").click(function() {
            $("#connectDiv").hide();
            $("#joinDiv").show();        
            socket = io.connect('http://' + config.host + ':' + config.port);
            client.start();
            socket.on('welcome', function (data) {
                socket.emit('intro', { name: $("#name").val() });
            });
            
            socket.on('joined', function(data) {
                me = data.your_name;
            });
            
            // The current state of the match (current score and target score)
            socket.on('match', function (data) {
                match = new Match(data.targetScore);
                match.teams[0].points = data.score[0];
                match.teams[1].points = data.score[1];
            });

            socket.on('ping', function(data) {
                socket.emit('pong', {});
            });
            
            // The current state of all the objects and such
            socket.on('state', function (data) {
                if(match === undefined) { return; } // Bail if we got this before match data.
                for(var name in data.players) {
                    if(players[name] === undefined) {
                        players[name] = new Player(name);
                    }
                    if(data.players[name].avatar !== undefined) {
                        if(players[name].avatar === undefined)
                        {
                            var team = match.teams[data.players[name].avatar.team];
                            players[name].avatar = new Avatar(team);
                            // The local player uses client-side prediction, whereas other players are based on data the 
                            // server tells us.
                            if(name === me) { 
                                players[name].avatar.netUpdate = localPlayer(players[name]);
                            }
                            else {
                                players[name].avatar.netUpdate = remotePlayer(players[name]);
                            }
                            // Always set their position the first time
                            players[name].avatar.body.position = data.players[name].avatar.position;
                        }
                        players[name].ping = data.players[name].ping;
                        players[name].avatar.serverPosition = data.players[name].avatar.position;
                    }
                }
            });
        });
        
        $("#join").click(function() {
            socket.emit('join', { team: ($("#team").val() === 'left') ? 0 : 1 });
            $("#joinDiv").hide();
        });
    });
    
    var net = {};
    net.sendInput = function(button, state) {
        socket.emit('input', {button:button, state:state});
    };
    return net;
}());