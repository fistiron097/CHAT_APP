// we used to store users that are joining their details in an array
const users = [];

//Join user to chat
function userJoin(id,username,room){
    const user = {id, username,room};
    users.push(user);
    return user;
}

// getCurrent user
function getCurrentUser(id){
    return users.find(user => user.id ===id);
}
//User leaves the chat 
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

//get roomusers
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};