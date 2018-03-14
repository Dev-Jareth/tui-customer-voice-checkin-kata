import io from 'socket.io-client';
import $ from 'jquery'
const socket = io('http://localhost:8000')
const recognition = new webkitSpeechRecognition();
const sessionId = Date.now()
const authHeader = "Bearer 4ace282fc121450cb3553803bf7cfdd3"
    const getBookingDetails = id => socket.emit("getBookingDetails", id);
const getIntent = async text =>  {
    return await $.get({
        url: "https://api.dialogflow.com/v1/query", data: {v:'20170712',query:text,sessionId, lang:'en'}, beforeSend: xhr => xhr.setRequestHeader("Authorization", authHeader)    })
}
const handleTranscript = text => {
    console.log("text:",text)
    getIntent(text).then(handleIntent).catch(console.log)
}
const handleIntent = res =>{
    res = res.result;
    if (res.metadata.intentName == "getbooking"){
        getBookingDetails(res.parameters.number)
    }
}
var isListening = false;
recognition.onstart = () => { console.log("Listening"); isListening = true }
recognition.onend = () => { console.log("Stopped Listening"); isListening = false }
recognition.onresult = event => handleTranscript(event.results[0][0].transcript)
socket.on("connect", () => console.log("Connected"))
socket.on("bookingDetails", data => console.log("Booking", data))

$().ready(() => {
    const micDomButton = document.getElementById('micButton');
    const messagesDom = document.getElementById('message');
    document.addEventListener('click', e => {
        e.preventDefault()
        console.log("Button Clicked")
        if(isListening) recognition.stop()
        else recognition.start()
    })
    const sendMessage = msg => messagesDom.appendChild(messageToDom(msg));
    const messageToDOM = msg => `<p>${msg}</p>`;
})