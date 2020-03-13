const { User } = require('../models');
const createError = require('../helpers/createError');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {
    static register (req, res, next) {
        let { email, password } = req.body;
        let obj = { email, password }
        User.findOne({ where: { email } })
            .then(data => {
                if (data) {
                    throw createError(400, 'Your Email has already been registered');
                } else {
                    return User.create(obj);
                }
            }).then((result) => {
                res.status(201).json(result);
            }).catch(err => {
                next(err);
            });
    }
    static login (req, res, next) {
        let { email, password } = req.body;
        let payload = null;
        User.findOne({ where: { email } })
            .then(data => {
                if (!data) {
                    throw createError(404, 'Wrong Username / Password');
                } else {
                    payload = data;
                    return compare(password, data.password);
                }
            }).then(result => {
                if (!result) {
                    throw createError(404, 'Wrong Username / Password');
                } else {
                    let token = generateToken({ id: payload.id })
                    res.status(200).json({ token });
                }
            }).catch(err => {
                next(err);
            });
    }
    static googleLogin(req, res, next) {
        let token = req.body.token;
        let payload = null;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            return User.findOne({ where: { email: payload.email } })
        }).then(data => {
            if (!data) {
                 return User.create({
                    email: payload.email,
                    password: process.env.GENERATE_PASSWORD
                })
            } else {
                return data;
            }
        }).then(data => {
            let newPayload = { id: data.id };
            let token = generateToken(newPayload);
            res.status(200).json({ token });
        }).catch(err => {
            next(err);
        });
    }
}

module.exports = UserController;