 'use strict';

const {sessionStore} = require('../stores');

module.exports = (req, res, next) => {
    if (! (req.headers.cookie && req.headers.cookie.split(`=`)[0] === `sid`)) {
        return res.status(401).redirect('/login');
    }

    const sessionId = req.headers.cookie.split(`=`)[1];
    const getSession = sessionStore.getUser(sessionId);
    if (!(getSession && getSession.user)) return res.status(401).redirect('/login');
    const {user: data,id} = getSession;

    res.locals.user = {data,id};
    next();
} 