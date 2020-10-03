'use strict';

module.exports = (store) => (
    async (req, res, next) => {
        const { username } = req.body
        if (store.findByName(username)) {
            return res.status(409).redirect(`/register`);
        }
        next();
    }
)