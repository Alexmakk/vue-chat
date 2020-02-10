const app = require('express')()
const socketIO = require('socket.io')
const http = require('http')
const users = require('./users')()

const port = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketIO(server)

const m = (name, text, senderId, id, room) => ({ name, text, senderId, id, room })

io.on('connection', socket => {
  console.log('IO Connection')

  socket.on('userJoined', (data, cb) => {
    if (!data.name) {
      return cb('Данные некорректны')
    }
    users.remove(socket.id)
    let room = Date.now()
    const checkRoom = users.getByRoom(room)
    if (checkRoom.length) {
      room++
    }
    users.add({
      id: socket.id,
      name: data.name,
      room: room
    })
    
    socket.join(room)
  cb({userId: socket.id, room: room}) 
  io.emit('updateUsers', users.getUsers()) 
  })

  socket.on('connectSupport', (data, cb) => {
    if (!data.userType) {
      return cb('Данные некорректны')
    }
    
    users.add({
      id: socket.id,
      userType: data.userType
    })
  cb({userId: socket.id})
  })

  socket.on('supportJoined', (data, cb) => {
    if (!data.userType) {
      return cb('Данные некорректны')
    }
    
    socket.join(data.room)
  cb({userId: socket.id, room: data.room})
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Пользователь не ввел сообщение') 
    }
    const user = users.get(data.senderId)
    if (user) {
      io.to(data.room).emit('newMessage', m(user.name, data.text, data.senderId, data.id, user.room))
    }
    cb() 
  })
  
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.emit('updateUsers', users.getUsers())
      
    }
  })

})

server.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
})