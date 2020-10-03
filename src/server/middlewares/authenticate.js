'use strict';

module.exports = (store) => (
    async (req, res, next) => {      
        const { username, password } = req.body;

        if ( !store.checkUser(username, password)) {
            return res.status(403).redirect(`/login`);
        }

        next();
    }
);
