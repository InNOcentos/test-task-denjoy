'use strict';

module.exports = (store) => (
    (req, res, next) => {
        const { username } = req.body
        if (store.findByName(username)) {
            return res.status(409).redirect(`/register`);
        }
        next();
    }
)