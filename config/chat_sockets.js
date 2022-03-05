module.exports.chatSockets = function(socketServer) {
    // deprecated code from v2
    // let io = require('socket.io')(socketServer);

    // Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing (CORS).
    // https://socket.io/docs/v4/handling-cors/
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials:true
        }
    });

    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function() {
            console.log('socket disconnected!');
        });
    });
}