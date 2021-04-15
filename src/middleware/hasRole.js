const User = require('../models/user');

const hasRole = async (req, res, role) => {
    try {
        console.log(req);
        console.log(role);
        if (!req.user.roles.includes(role)){
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(401).send({ error: 'Insufficient Permissions.'})
    }
}

module.exports = hasRole;