"use strict";

const {nanoid} = require('nanoid');

class OwnSession {
  constructor() {
    this.sessions = {};
  }

  getUser(sessionId) {
    if (this.sessions[sessionId]) {
        if ((new Date() - this.sessions[sessionId][`expDate`]) > 0) {
          const newId = nanoid(6);
          this.sessions[newId] = {};
          Object.assign(this.sessions[newId], this.sessions[sessionId]);
          delete this.sessions[sessionId];
          this.sessions[newId][`expDate`] = new Date(Date.now() + 120000);
          return {
            user: this.sessions[newId],
            id : newId
          }
        }
        return {
          user: this.sessions[sessionId],
          id : sessionId
        }
    }
    return null;
  }

  setUser(sessionId, userData) {
    if (this.sessions[sessionId]) {
      Object.assign(this.sessions[sessionId], userData);
      return;
    }
    userData.expDate = new Date(Date.now() + 120000);
    this.sessions[sessionId] = userData;
    return;
  }
}

module.exports = new OwnSession();
