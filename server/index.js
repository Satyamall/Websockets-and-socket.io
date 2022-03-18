
const socketServer = require("socket.io");

const io = new socketServer.Server(8080,{
    cors:{
        origin: "*",
    }
});

let count = 0;
let users = {};
let messages = [];

io.on("connection",(socket)=>{
    console.log("connected", socket.id, `: ${++count} users are logged in`)
    
    socket.on("user_login",name=>{
        console.log(name,"logged in")
        users[socket.id]=name;
        console.log(users);
        console.log(io.clients);
        // socket.emit("users_in_room",users);
        io.emit("users_in_room",users);
        io.emit("all_messages",messages);
        // incase you don't want to send a message to everyone,
        // send it to everyone except you
    })

    socket.on("user_message_send_success_client",data=>{
        console.log(data);
        // * messages
        // * add it to do
        // * filter, profanity filter
        messages.push(data);
        io.emit("user_message_send_success_server",data)
    })

    socket.on("disconnected",()=>{
        console.log(`disconnected`, socket.id, `: ${--count} users are logged out`)
        delete users[socket.id]
    })
})