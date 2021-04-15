const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const auth = async (req, res, next, role) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
//         if (!user) {
//             throw new Error();
//         }

//         req.token = token;
//         req.user = user;
//         next();
//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate.'})
//     }
// }

const auth = async (req, res, next, role) => {
    // return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
            if (!user) {
                throw new Error();
                // throw new Error('Please authenticate');
            }
            console.log(user);
            console.log(role);
            if (!user.roles.includes(role)) {
                throw new Error();
                // throw new Error('Insufficient Permissions');
            }

            req.token = token;
            req.user = user;
            next();
        } catch (e) {
            res.status(401).send({ e: 'Invalid' })
        }
    // }
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

module.exports = auth;