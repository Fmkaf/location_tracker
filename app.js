const express = require('express');
const path = require('path');
const app = express();
const port = 8000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))

io.on("connection", (socket) => {
    socket.on("send-location", ({ latitude, longitude }) => {
        io.emit("receive-location", { id: socket.id, latitude, longitude })
        console.log(socket.id)
    })
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
    console.log("Socket successfully connected")
})
app.get('/', function (req, res) {
    res.render("index")
})

app.get('/test', function (req, res) {
    res.send("hello world!")
})


server.listen(port, () => { console.log(`Listening on Port ${port}`) })

