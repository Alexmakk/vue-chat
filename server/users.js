class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }

  get(id) {
    return this.users.find(user => user.id === id)
  }

  getUsers() {
    return this.users.filter(user => user.userType !== 'support')
  }

  remove(id) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    return user
  }

  getByRoom(room) {
    return this.users.filter(user => user.room === room)
  }
  getAllRooms() {
    return this.users.map(user => user.room).filter(item => item !== undefined)
  }
}

module.exports = function() {
  return new Users()
}
