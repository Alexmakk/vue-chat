function showDialog() {
  this.isDialogOpen = !this.isDialogOpen;
}

function sendMessage() {
  if (this.newMessage.trim() === '') return;
  this.$socket.emit(
    'createMessage',
    {
      text: this.newMessage,
      room: this.currentRoom,
      senderId: this.currentUser,
      id: Date.now().toString()
    },
    data => {
      if (typeof data === 'string') {
        console.error(data);
      } else {
        this.newMessage = '';
      }
    }
  );
}

function connectToRoom(room) {
  // this.messages = [];

  const support = {
    userType: this.userType,
    room
  };

  this.$socket.emit('supportJoined', support, data => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      support.id = data.userId;
      this.currentRoom = data.room
      this.currentUser = support.id
    }
  })
}

function connectSupport() {
  const support = {
    userType: 'support'
  };

  this.$socket.emit('connectSupport', support, data => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      support.id = data.userId;
      this.setUser(support);
      this.$router.push("/support");
    }
  })
}

function handleSubmit() {

  const user = {
    name: this.userName,
    userType: this.userType
  };

  this.$socket.emit('userJoined', user, data => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      user.id = data.userId;
      user.room = data.room;

      this.setUser(user);

      this.isDialogOpen = false;
      this.currentRoom = user.room
      this.currentUser = user.id
    }
  });  
}

function handleInput(name, value) {
  // console.log(name, value);
  this[name] = value;
}

export {
  sendMessage,
  connectToRoom,
  handleInput,
  showDialog,
  handleSubmit,
  connectSupport
};
