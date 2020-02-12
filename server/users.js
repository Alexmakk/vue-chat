class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }

  getUserbyId(id) {
    return this.users.find(user => user.id === id)
  }

  getUserbyType(type) {
    return this.users.find(user => user.userType === type)
  }

  getUsers() {
    return this.users.filter(user => user.userType !== 'support')
  }

  remove(id) {
    const user = this.getUserbyId(id)

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    return user
  }

}

module.exports = function() {
  return new Users()
}
