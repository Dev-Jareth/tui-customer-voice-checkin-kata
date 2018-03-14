const express = require('express')
const socketio = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = socketio(server)
//Fake database
const data = {booking:{data:{331:{roomId:401,customers:["Bob Sinclaire","Mary Mary"]}},byId:id=>data.booking.data[id]}}


app.use(express.static( 'public'))
io.on('connection',client=>{
    client.on('getBooking',id=>client.emit('bookingDetails',data.booking.byId(id)))
})

server.listen(8000, () => console.log('Example app listening on port 8000!'))