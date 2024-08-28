const express = require('express')
const path = require('path')
const app  = express()

const port = 3000
const server = app.listen(port, ()=> console.log(`app is running http://localhost:${port}`))

app.use(express.static(path.join(__dirname, 'public')))


let socketConnected = new Set()

const io = require('socket.io')(server);
io.on('connection', onconnected);

function onconnected(socket){
    console.log(socket.id);
    socketConnected.add(socket.id)

    io.emit('clients-total', socketConnected.size)

    socket.on('disconnect', ()=>{
        console.log('Socket disconnected', socket.id);
        socketConnected.delete(socket.id)
        io.emit('clients-total', socketConnected.size)
    })

    socket.on('message',  (data)=>{
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback',  (data) => {
        socket.broadcast.emit('feedback', data)
    })
}
