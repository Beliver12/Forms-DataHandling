// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
    constructor() {
      this.storage = {};
      this.id = 0;
      this.searchedUser = {};
    }
  
    addUser({ firstName, lastName, email, age, bio }) {
      const id = this.id;
      this.storage[id] = { id, firstName, lastName, email, age, bio };
      this.id++;
    
    }
  
    getUsers() {
      return Object.values(this.storage);
    }
  
    getUser(id) {
      return this.storage[id];
    }
  
    updateUser(id, { firstName, lastName, email, age, bio }) {
      this.storage[id] = { id, firstName, lastName, email, age, bio };
    }
  
    deleteUser(id) {
      delete this.storage[id];
     
    
    }

    searchUser(firstName) {
    this.searchedUser = {};
    Object.values(this.storage).forEach((val )=> {
      if(val && val.firstName === firstName){
        Array.prototype.push.call(this.searchedUser, val) 
      }
     // console.log(val.firstName)
     else {
      return
      }
    })
   // console.log('storage:',this.storage)
    console.log('SearchedUser:',this.searchedUser)
      return Object(this.searchedUser);
    }
  }
  // Rather than exporting the class, we can export an instance of the class by instantiating it.
  // This ensures only one instance of this class can exist, also known as the "singleton" pattern.
  module.exports = new UsersStorage();
  