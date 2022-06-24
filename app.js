const express = require('express')
const app = express()
const http = require('http');
const { Server } =  require('socket.io');
const cors = require("cors");
const bodyParser = require('body-parser');
const MessagerModel = require('./models/listMess');

const port = process.env.PORT || 3001;

const messagerRouter = require('./routers/messager');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/messager', messagerRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
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
        
        const d = new Date();
        MessagerModel.create({
            message: data.message,
            name: data.name,
            room: data.room,
            time: d,
        })
        // .then(data => {
        //     res.status(200).json(data)
        // })
        // .catch(err => res.status(500).json(err));
    })

})

server.listen(port, () => {
  console.log(`Sever on port ${port}`)
})
