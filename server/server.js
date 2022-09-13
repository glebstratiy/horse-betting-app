'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const INTERVAL = 1000;
const PORT = 3002;

const horses = [
  {
    name: 'Princess Diana',
    distance: 0
  },
  {
    name: 'Cricket',
    distance: 0
  },
  {
    name: 'Rebel',
    distance: 0
  },
  {
    name: 'Lucy',
    distance: 0
  },
  {
    name: 'Lacey',
    distance: 0
  },
  {
    name: 'Ginger',
    distance: 0
  },
];

function sendWin(socket){
  let winnerName = horses[Math.round(Math.random() * horses.length)]
  socket.emit('winner', winnerName)
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

socketServer.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('start', () => {
    sendWin(socket);
  });
  socket.on('bet', (res)=>{
    console.log(`You bet on ${res}`)
  })
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
