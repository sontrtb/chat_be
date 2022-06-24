const express = require('express')
const app = express()
const http = require('http');
const { Server } =  require('socket.io');
const cors = require("cors");

const port = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("send_mess", (data) => {
        socket.to(data.room).emit("receive_mess", data);
    })

})

server.listen(port, () => {
  console.log(`Sever on port ${port}`)
})
