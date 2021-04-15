const User = require('../models/user');

const hasRole = async (req, res, role) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
        if (!user.roles.includes(role)){
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Insufficient Permissions.'})
    }
}

module.exports = hasRole;