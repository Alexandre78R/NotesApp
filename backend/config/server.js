require("./db");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const router = require('../router.js');
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.static(path.join(__dirname + "../../public")));
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
      origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

// Liste des utilisateurs actifs
const activeUsers = {};

const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Gérer l'événement de connexion d'un nouvel utilisateur
  socket.on("userConnected", (userId) => {
    activeUsers[socket.id] = userId;
    io.emit("activeUsers", Object.values(activeUsers));
  });

  // Gérer l'événement de déconnexion d'un utilisateur
  socket.on("disconnect", () => {
    delete activeUsers[socket.id];
    io.emit("activeUsers", Object.values(activeUsers));
  });

  // Gérer l'événement de mise à jour du contenu de l'éditeur
  socket.on("editorContentUpdate", (content) => {
    socket.broadcast.emit("editorContentUpdate", content);
  });

  // Gérer l'événement de mise à jour de la couleur
  socket.on("editorColorUpdate", (color) => {
    socket.broadcast.emit("editorColorUpdate", color);
  });

  // Gérer l'événement de mise à jour de la taille
  socket.on("editorSizeUpdate", (size) => {
    socket.broadcast.emit("editorSizeUpdate", size);
  });
});

module.exports = server;