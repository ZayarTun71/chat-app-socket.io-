const express = require("express");
const socket = require("socket.io");
const app = express();

const server = app.listen(4000, () => {
  console.log("project is running on localhost:4000");
  return;
});

app.get("/", (res, req) => {
  req.sendFile(__dirname + "/public/index.html");
});

const io = socket(server);
io.on("connection", (socket) => {
  // console.log('socket connection connected '+socket.id);
  socket.on("chat",(data)=>{
    io.sockets.emit("chat", data);
  });

  socket.on("typing",(name)=>{
    socket.broadcast.emit("typing", name);
  });
});
