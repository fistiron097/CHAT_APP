const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Get username and room from URL
const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
});

// client side code hai 
const socket = io(); // Establish connection to the server- Socket.io client library
//Join chatroom
socket.emit('joinRoom',{username,room});

//Get Room and users

socket.on('roomUsers', ({room,users}) =>{
  outputRoomName(room);
  outputUsers(users);
});

//and from server here we catch the message
// Message from server
socket.on('message', message =>{ // it listens message coming from server OR agar emit hota toh client to server bheja jata hai mssg
  outputMessage(message); // it is giving object

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', e =>{
  e.preventDefault();
  // get message text
  const msg = e.target.elements.msg.value;
  // emitting mssg to server
  socket.emit('chatMessage',msg);
  // clear the value of msg after sending 
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message){
  const div = document.createElement("div");
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span> </p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room){
  roomName.innerText = room;
  console.log(roomName);
}
// Add users to DOM
function outputUsers(users){
  userList.innerHTML = `
  ${users.map(user => `<li>${user.username} </li>`).join('')}
  `;
}
