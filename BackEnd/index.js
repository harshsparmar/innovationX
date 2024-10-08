
require('dotenv').config();
const express=require("express")
const mongoose=require("mongoose");
const cors=require("cors");
const studentRoutes=require("./routes/studentRoutes");
const projectRoutes=require("./routes/projectRoutes");
const commentRoutes=require("./routes/commentRoutes");
const documentationRoutes=require("./routes/documentationRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const connectionRoutes=require("./routes/connectionRoutes");
const http = require('http');
const { Server } = require("socket.io");

const app=express();
app.use(express.json()); // for JSON requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Projects"))

// api for fetching data
app.use("/api/students",studentRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/documentations",documentationRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/connections",connectionRoutes);


// Set up the MongoDB connection pool
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    // Adjust the pool size as needed
  };
  
  mongoose.connect(process.env.MONGO_URL, mongoOptions);
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

// Create HTTP server and integrate with Socket.io
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