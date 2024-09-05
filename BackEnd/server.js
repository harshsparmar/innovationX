// const express = require('express');
// const http = require('http');
// const { Server } = require("socket.io");
// const cors = require('cors');

// const app = express();
// app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
    transports: ['websocket', 'polling']
});

let chatMessages = [];

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Send existing messages to the new client
    socket.emit('initialMessages', chatMessages);
    
    // Listen for new messages
    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        chatMessages.push(message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Add a route to test if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});