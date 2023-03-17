const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', function (socket) {
  console.log('Client connected.');
  clients.add(socket);

  socket.on('message', function (message) {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    clients.forEach(function (client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', function () {
    console.log('Client disconnected.');
    clients.delete(socket);
  });
});