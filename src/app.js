const express = require('express')
const routes = require('./routes')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const PORT = 3000;
const messages = [];

const app = express()
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set("view engine", "handlebars");

routes(app)

const httpServer = app.listen(PORT, () => {
    console.log(`listening at port ${httpServer.address().port}`);
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`new user id ${socket.id}`);

    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})