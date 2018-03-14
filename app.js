import io from 'socket.io-client';
const socket = io('http://localhost:8000')
const recognition = new webkitSpeechRecognition();
var isListening = false;
recognition.onstart = () => { console.log("Listening"); isListening = true }
recognition.onend = () => { console.log("Stopped Listening"); isListening = false }
recognition.onresult = event => console.log(event.results[0][0].transcript)
socket.on("connect", () => console.log("Connected"))
socket.on("bookingDetails", data => console.log("Booking", data))
document.addEventListener("DOMContentLoaded", () => {
    document.removeEventListener("DOMContentLoaded", this);
    domReady();
})
const domReady = () => {
    const micDomButton = document.getElementById('micButton');
    const messagesDom = document.getElementById('message');
    document.addEventListener('click', e => {
        e.preventDefault()
        console.log("Button Clicked")
    })
    const getBookingDetails = id => socket.emit("getBookingDetails", id);
    const sendMessage = msg => messagesDom.appendChild(messageToDom(msg));
    const messageToDOM = msg => `<p>${msg}</p>`;
}