import io from 'socket.io-client';
const socket = io('http://localhost:8000')
socket.on("connect",()=>console.log("Connected"))
socket.on("bookingDetails",data=>console.log("Booking",data))
