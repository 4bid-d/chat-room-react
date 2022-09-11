const io = require("socket.io")(3000,{
    cors:{
        origin:"http://localhost:8080"
    }
})

io.on("connection",socket=>{
    console.log(socket.id)
    socket.on("message-sent",(message,room)=>{
        if(room == ""){
            socket.broadcast.emit("recieve-message",message)
        }else{
            socket.to(room).emit("recieve-message",{message : message , by :room })
        }
        console.log(message)
    })

    socket.on("join-room",(room,cb)=>{
        socket.join(room)
        cb(`you just joined room  ${room}`)
    })
})