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
      console.log(this.storage)
    }

    searchUser(firstName) {
    
     let objL = Object.keys(this.storage).length
     if(Object.keys(this.searchedUser).length > 1) {
      this.searchedUser = {}
    }
    
     for(let i = 0; i <= objL; i++) {
      if(this.storage[i] === undefined) {
        continue
       
      } 
      if(this.storage[i].firstName === firstName) {
        Array.prototype.push.call(this.searchedUser, this.storage[i])   
      }
     }
    //console.log(this.searchedUser)
      return Object(this.searchedUser);
    }
  }
  // Rather than exporting the class, we can export an instance of the class by instantiating it.
  // This ensures only one instance of this class can exist, also known as the "singleton" pattern.
  module.exports = new UsersStorage();
  