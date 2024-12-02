require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");
const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000",
  "https://mohammad-200.github.io",
  "https://cinema-frontend-qvuk.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(messageRoutes);

app.get("/ping", (req, res) => {
  console.log("pong");
  res.status(200).send("pong");
});

// http to create server instance
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server instance
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("New message received: ", newMessageReceived);
    // Broadcast the new message to all connected clients
    socket.broadcast.emit("message received", newMessageReceived);
  });
});

// Function to start the server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY);
    server.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
