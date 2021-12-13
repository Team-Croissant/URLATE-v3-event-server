const config = require(__dirname + "/../config/config.json");
const io = require("socket.io")(config.project.port);
let adminId = "";
let displayId = "";

io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected.`);
  io.to(socket.id).emit("broadcast", socket.id);

  socket.on("admin", () => {
    adminId = socket.id;
  });

  socket.on("display", () => {
    displayId = socket.id;
  });

  socket.on("handshake", (id, screen) => {
    io.emit("handshake", id, socket.id, screen);
  });

  socket.on("connected", (socketId) => {
    io.to(socketId).emit("connected");
  });

  socket.on("initialize", (socketId) => {
    io.to(socketId).emit("initialize");
  });

  socket.on("initialized", (name) => {
    io.emit("initialized", name, socket.id);
  });

  socket.on("tutorial", (socketId, users) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial", users);
  });

  socket.on("tutorial loaded", () => {
    io.emit("tutorial loaded", socket.id);
  });

  socket.on("ready", () => {
    io.emit("ready", socket.id);
  });

  socket.on("tutorial start", (socketId, date) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial start", date);
  });

  socket.on("tutorial restart", (socketId) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("tutorial restart");
  });

  socket.on("update", (userId, mouseX, mouseY) => {
    io.emit("update", userId, mouseX, mouseY);
  });

  socket.on("score", (userId, score) => {
    io.emit("score", userId, score);
  });

  socket.on("judge", (userId, judge, x, y) => {
    io.emit("judge", userId, judge, x, y);
  });

  socket.on("destroy", (userId, i) => {
    io.emit("destroy", userId, i);
  });

  socket.on("damaged", (userId) => {
    io.emit("damaged", userId);
  });

  socket.on("game ended", (userId, score, rank, judge) => {
    io.emit("game ended", userId, score, rank, judge);
  });

  socket.on("result sync", (date) => {
    io.emit("result sync", date);
  });

  socket.on("select music", (socketId) => {
    io.to(socketId == "Display" ? displayId : socketId).emit("select music");
  });

  socket.on("select loaded", (id) => {
    io.emit("select loaded", id);
  });

  socket.on("select sync", (date, finDate) => {
    io.emit("select sync", date, finDate);
  });

  socket.on("select started", (id) => {
    io.emit("select started", id);
  });

  socket.on("selecting", (id, track, producer, file) => {
    io.emit("selecting", id, track, producer, file);
  });

  socket.on("selected", (id) => {
    io.emit("selected", id);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} : User Disconnected.`);
    if (socket.id == adminId) {
      io.emit("admin disconnected");
    } else {
      io.emit("disconnected", socket.id);
    }
  });
});
