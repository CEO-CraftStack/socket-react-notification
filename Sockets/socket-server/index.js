import { Server } from 'socket.io';

const io = new Server({ 
    cors:{
        origin: 'http://localhost:3000'
    }

});
let onLineUsers = [];
const addNewUser = (username, socketId) => {
    !onLineUsers.some((user)=> user.username === username) && onLineUsers.push({username, socketId});
};

const removeUser = (socketId) => {
onLineUsers = onLineUsers.filter((user) => user.socketId !== socketId)
};
const getUser = (username) => {
    return onLineUsers.find((user) =>user.username === username);
};

io.on('connection', (socket)=>{
    socket.on("newUser", (username) =>{
        addNewUser(username, socket.id)
    });
    // send notification
    socket.on("sendNotification", ({senderName, receiverName, type}) => {
     const receiver = getUser(receiverName)
     io.to(receiver.socket.id).emit('getNotification', {
         senderName,
         type,
     }); 
    });
    // send Text
    // socket.on("sendText", ({senderName, receiverName, text})=>{
    //     const receiver = getUser(receiverName)
    //     io.to(receiver.socketId).emit('getNotification', {
    //         senderName,
    //         text,
    //     }); 
    //    });

    socket.on("disconnect", () =>{
     removeUser(socket.id)

    });
});
io.listen(5000);