const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const formatMessage = require('./util/message');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./util/users');


const app = express();
const server = http.createServer(app);

app.use(cors());

const chatAdmin = 'SW Admin';

const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

//Runs when a client connects
io.on('connection', socket => {
    console.log(`Usesr with id ${socket.id} connected`);

    //When user joins
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        
        // Welcome user
        socket.emit('message', formatMessage(chatAdmin, `Welcome to the StreamWorks chat system!`))

        //Broadcast that user joined
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(chatAdmin, `User ${user.username} has joined this chat.`)
            );
        
            //Send users and room info
            io.in(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
            });
    });

    //Listen for chat msgs
    socket.on('chatMsg', msg => {

        const user = getCurrentUser(socket.id);

        io.in(user.room).emit('message', formatMessage(user.username, msg));
    });

    //Runs when client disconnects
    socket.on('disconnect', () => {
        console.log(`user id ${socket.id} disconnected`);
        const user = userLeave(socket.id);

        if (user) {
            io.in(user.room)
            .emit('message', formatMessage(chatAdmin, `User ${user.username} has left the chat`));

            //resend users and room info
            io.in(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
            })
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})