const User = require('../models/user');

const hasRole = async (user, role) => {
    try {
        console.log(user);
        console.log(role);
        if (!user.roles.includes(role)){
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(401).send({ error: 'Insufficient Permissions.'})
    }
}

module.exports = hasRole;