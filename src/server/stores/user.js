'use strict';

class Store {
    constructor () {
        this._users = [];
    }

    add(username, password) {
        this._users.push({ username, password});
    }

    findByName(username) {
        return this._users.find((user) => user.username === username);
    }

    checkUser(username, password) {
        const user = this._users.find((user) => user.username === username);
        if (!user) return false;
        
        return user.password === password;
    }
}

module.exports = new Store();