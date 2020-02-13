const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');
const users = require('./users')();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + "/../dist"))

io.on('connection', socket => {
  console.log('IO Connection');

  socket.on('userJoined', (data, cb) => {
    if (!data.name) {
      return cb('Данные некорректны');
    }
    users.remove(socket.id);

    users.add({
      id: socket.id,
      name: data.name,
      userType: data.userType,
      chatHistory: []
    });

    cb({ userId: socket.id });
    io.emit('updateUsers', users.getUsers());
  });

  socket.on('supportJoined', (data, cb) => {
    if (!data.userType) {
      return cb('Данные некорректны');
    }
    const user = users.getUserbyType(data.userType);
    if (user) {
      return cb('Оператор уже вошел, вы можете войти только как пользователь');
    } else {
      users.add({
        id: socket.id,
        userType: data.userType
      });
    }
    cb({ userId: socket.id });
  });

  socket.on('connectToUser', (data, cb) => {
    if (!data.userType) {
      return cb('Данные некорректны');
    }

    const user = users.getUserbyId(data.userId);
    socket.join(user.id)
    if (user) {
      socket.emit('chatHistory', user.chatHistory);
    }
    cb({ userId: socket.id });
  });

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Пользователь не ввел сообщение');
    }

    let user = {};

    if (data.recipientId !== null) {
      user = users.getUserbyId(data.recipientId);
    } else if (data.userType === 'support') {
      return cb('Не выбран получатель сообщения')
    } else {
      user = users.getUserbyId(data.senderId);
    }

    if (user) {
      user.chatHistory.push(data);
      io.to(user.id).emit('newMessage', data);
    }
    cb();
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnect`);
    const user = users.remove(socket.id);
    if (user) {
      socket.emit('clearStore')
      io.emit('updateUsers', users.getUsers());
    }
  });

  socket.on('error', err => {
    console.log('received error from client:', socket.id);
    console.log(err);
  });
});

server.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
