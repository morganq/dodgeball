var game = require('./shared.js');
var port = (process.argv.length > 2) ? +process.argv[2] : 3333;
var io = require('socket.io').listen(port);
io.set('log level', 1);

var players = {};
var match = new game.Match(21);

var updateGame = (function() {
    var lastUpdate = new Date().getTime();
    return function() {
        var now = new Date().getTime();
        var dt = (now - lastUpdate) / 1000.0;
        lastUpdate = now;
        for(var name in players) {
            if(players[name].avatar !== undefined) {
                players[name].avatar.update(dt);
            }
        }
    };
}());

io.sockets.on('connection', function (socket) {
    // Socket will be a given client. This closure is a nice way of wrapping up functionality for an individual
    // connection.

    // Some functions are called on a delay. If the connection's closed by the time they are called,
    // errors will occur. So, we use this wrapper to handle the connection closing
    var connected = true;
    var allTimers = [];
    var validConnectionTimer = function(f, time){
        var validConnectionFunc = function() {
            return function() {
                if(connected === true) { f(); }
                else { console.log(time); }
            };
        };        
        var tt = setInterval(validConnectionFunc(f), time);
        allTimers.push(tt);
    };
  
    // Start the match on the first connection.
    if(match.started === false) {
        match.started = true;
        setInterval(updateGame, 50);    // Don't use the valid connection wrapper here because this should happen regardless
    }
    
    socket.emit('welcome', {});
    socket.emit('match', {targetScore: match.targetScore, score: [match.teams[0].points, match.teams[1].points]});
    
    var sendGameState = function() {
        var state = {};
        state.players = {};
        for (var name in players) {
            var player = players[name];
            state.players[name] = {};
            if(player.avatar !== undefined){
                state.players[name].avatar = {team:player.avatar.team.id, position: player.avatar.body.position};
                state.players[name].ping = players[name].ping;
            }
        }
        socket.emit('state', state);
    };
    
    validConnectionTimer(sendGameState, 100);

    socket.on('intro', function(data) {
        while(players[data.name] !== undefined) {
            data.name += "_";
        }
        var player = new game.Player(data.name);
        player.ping = 1000;

        var startTime = 0;
        
        socket.on('pong', function() {
            delta = new Date().getTime() - startTime;
            player.ping = delta / 1000;
        });

        var ping = function() { 
            startTime = new Date().getTime();
            socket.emit('ping', {});
        };        
        
        validConnectionTimer(ping, 2000);
        ping();        

        players[player.name] = player;
        
        socket.emit('joined', {your_name:player.name});
        
        socket.on('join', function(data) {
            console.log(data.team);
            player.avatar = new game.Avatar(match.teams[data.team]);         
            
            socket.on('input', function(data) {
                player.avatar.inputs[data.button] = data.state;
            });
            
        });
        
        socket.on('disconnect', function() {
            player.avatar.team.numPlayers -= 1; // TODO: also fix spawns
            delete players[player.name];
            connected = false;
            // Clear all the timers
            for(var i = allTimers.length - 1; i >= 0; i--) {
                clearInterval(allTimers[i]);
            }
        });

    });

});