import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
// import app from '../app.js';

// Initializing the Express server
const app = express()
const server = http.createServer(app);

// Wrap the server with Socket.io Server
const io = new Server(server , {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.77.81:3000","https://rms-six-tan.vercel.app"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});

const userSocketMap = {};  // {_id: socket.id}



// On Connection

io.on('connection', (socket)=> {

    const userId = socket.handshake.query.userId;
    const restaurantId = socket.handshake.query.restaurantId

    console.log('a user connected', socket.id);
    console.log("*************  Socket Map  ***************");
    console.log(userSocketMap);
    console.log("*************  Socket Map End ***************");
    if(userId){
        userSocketMap[userId] = {socketId: socket.id, restaurantId: restaurantId};
        console.log(userSocketMap);
    }

    const roomSize = io.sockets.adapter.rooms.get(restaurantId);
    console.log(restaurantId, roomSize)
    socket.join(userSocketMap[userId]?.restaurantId)
    

    
    
    
    socket.on('disconnect', () => {
        console.log('room size is', roomSize);
        delete userSocketMap[userId];
        console.log('user disconnected', socket.id);
    });



})





export { server, io, app } 