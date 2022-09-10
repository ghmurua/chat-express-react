import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    // origin: 'http://localhost:5173'
    origin: "*",
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("message", (message) => {
    // console.log(socket.id, message);
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id.slice(0,5)
    });
  });
});

server.listen(PORT, () => console.log("server on port", PORT));
