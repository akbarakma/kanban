const { verifyToken } = require('../helpers/jwt');
const createError = require('../helpers/createError');
const { User } = require('../models');

function authentication(req, res, next) {
    try {
        let { token } = req.headers;
        let decoded = verifyToken(token);
        if (!decoded) {
            throw createError(401, 'You Have to Login first');
        } else {
            User.findOne({ where: { id: decoded.id } })
                .then(data => {
                    if (!data) {
                        throw createError(401, 'You have to login first')
                    } else {
                        req.UserData = decoded;
                        next();
                    }
                }).catch(err => {
                    throw err;
                });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;