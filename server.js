// Server side ki coding chal rhi hai bete
// Entry point to everything 
const express= require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');
const { emit } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// We will publish our front end folder to static so that we can access them 
app.use(express.static(path.join(__dirname,'public')))
const botName = "BOT";
    
// here we address the message, Main socket.io Server   
io.on('connection', socket =>{

    socket.on('joinRoom',( {username,room} ) =>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);
        //welcome current user
        socket.emit('message', formatMessage(botName,'Welcome to the ChatChord!'));
        // broadcast when user connect 
        socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));   
        
        //Send users and room info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users: getRoomUsers(user.room)
        });
    });
  
  // listen for chat message
  socket.on('chatMessage', (msg) =>{
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message',formatMessage(user.username,msg));
  });

   // runs when client disconnect
  socket.on('disconnect', () =>{
    const user = userLeave(socket.id);
    if(user){
        io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`));
    }
    
    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users: getRoomUsers(user.room)
    });
    
    
  });

});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});