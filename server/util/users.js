const users = [];

const userJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
};

const getCurrentUser = (id) => {
    console.log(users);
    return users.find(u => u.id === id);
};

const userLeave = (id) => {
    const index = users.findIndex(u => u.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
};

const getRoomUsers = (room) => {
    const roomUsers = users.filter(u => u.room === room);
    console.log(roomUsers);
    return roomUsers;
};

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}