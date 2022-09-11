import  {io } from "socket.io-client"

const socket = io.connect('http://localhost:3000');
socket.on("connect",()=>{
    displayMessage(`you connected with id : ${socket.id}`)
})
socket.on("recieve-message",({message,by})=>{
    displayMessage(message)
})

const joinRoomButton = document.getElementById("room-button")
const messageInput  = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form  = document.querySelector("#form")

form.addEventListener("submit",(e) =>{
    e.preventDefault()
    const message = messageInput.value 
    const room = roomInput.value

    if(message !== "" ){
        displayMessage(message)
        socket.emit("message-sent", message,room,(message)=>{
            displayMessage(message)
        })
    }
})

joinRoomButton.addEventListener("click" , () => {
    const room = roomInput.value 
    socket.emit("join-room", room,(message)=>{
        displayMessage(message)
    })
})

function displayMessage( message){
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}