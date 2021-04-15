const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
        console.log(user);
        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

exports.authAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
        console.log(user);
        if (!user) {
            throw new Error();
        }
        if (!user.roles.includes('admin')) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}



// const hasRole = async (req, res, role) => {
//     try {
//         console.log(req);
//         console.log(role);
//         if (!req.user.roles.includes(role)){
//             throw new Error();
//         }
//         next();
//     } catch (e) {
//         res.status(401).send({ error: 'Insufficient Permissions.'})
//     }
// }

// module.exports = auth;