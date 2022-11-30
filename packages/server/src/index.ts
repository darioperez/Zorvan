import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { addUser, getUser, deleteUser, getUsers } from "./users";
import { rooms, createRoom } from "./rooms";

const app = express();
const http = createServer(app);
const io = new Server(http);
const PORT = process.env.PORT || 5000


app.use(cors())

io.on('connection', (socket) => {
  console.log("User connected");
  io.emit("rooms", rooms);

  socket.on('login', ({ name, room }, callback) => {
    createRoom(room);
    const { user, error } = addUser(socket.id, name, room)
    if (error) return callback(error)

    if (user) {
      socket.join(user.room)
      socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
    }
    io.in(room).emit('users', getUsers(room));
    io.emit("rooms", rooms);
    callback()
  })

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    if (user)
      io.in(user.room).emit('message', { user: user.name, text: message });
  })

  const logout = () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
      io.in(user.room).emit('users', getUsers(user.room))
    }
  };

  socket.on("disconnect", logout);

  socket.on("logout", logout);
})

app.get('/', (req, res) => {
  res.send("Server is up and running")
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
})