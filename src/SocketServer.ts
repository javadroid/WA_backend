let onlineUsers=[]as any[]
export default function SocketServer(socket: any,io:any) {
  // user is online
  socket.on("join", (user: any) => {
    console.log("user has joined: ", user);
    socket.join(user);

    if(!onlineUsers.some((u)=>u.userId===user)){
        onlineUsers.push({userId:user,socketId:socket.id})
    }
    io.emit('get_online_users',onlineUsers)
  });

  socket.on('disconnect',()=>{
    onlineUsers=onlineUsers.filter(user=>user.socketId!==socket.id )
    io.emit('get_online_users',onlineUsers)
})

  //join a conversation room
  socket.on("join_conversation", (conversation: any) => {
    console.log("user has joined conversation: ", conversation);
    socket.join(conversation);
  });

  //send and receive message

  socket.on("send_message", (messaeg: any) => {
    console.log("user has joined conversation: ", messaeg);
    let conversation = messaeg.conversation;

    if (!conversation.users) return;
    conversation.users.forEach((user: any) => {
      if (user._id === messaeg.sender._id) return;
      socket.in(user._id).emit("message_receive", messaeg);
    });
   
  });
}
