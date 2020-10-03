'use strict';

const alreadyRegister = require('./already-register');
const authenticate = require('./authenticate');
const privateRoute = require('./private-route');

module.exports = {
    alreadyRegister,
    authenticate,
    privateRoute
}