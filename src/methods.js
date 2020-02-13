function showDialog() {
  this.isDialogOpen = !this.isDialogOpen;
}

function sendMessage() {

  const id = (Date.now() + Math.random()).toString()

  if (this.newMessage.trim() === '') return;
  this.$socket.emit(
    'createMessage',
    {
      id: id,
      text: this.newMessage,
      senderId: this.user.id,
      userType: this.user.userType,
      recipientId: this.recipientId || null
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

function connectToUser(userId) {
  
  const obj = {
    userType: this.user.userType,
    userId
  };

  this.$socket.emit('connectToUser', obj, data => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      this.recipientId = userId
    }
  })
}

function connectSupport() {
  const support = {
    userType: 'support'
  };

  this.$socket.emit('supportJoined', support, data => {
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
console.log('click')
  const user = {
    name: this.userName,
    userType: this.userType
  };

  this.$socket.emit('userJoined', user, data => {
    if (typeof data === 'string') {
      console.error(data);
    } else {
      user.id = data.userId;
      this.setUser(user);

      this.isDialogOpen = false;
      this.currentUserId = user.id
    }
  });  
}

function handleInput(name, value) {
  this[name] = value;
}

export {
  sendMessage,
  connectToUser,
  handleInput,
  showDialog,
  handleSubmit,
  connectSupport
};
