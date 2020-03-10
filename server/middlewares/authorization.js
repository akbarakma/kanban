const { Task } = require('../models');
const createError = require('../helpers/createError');

function authorization (req, res, next) {
    let TaskId = Number(req.params.id);
    let UserId = Number(req.UserData.id);
    Task.findOne({ where: { id: TaskId } })
        .then(data => {
            if (!data) {
                throw createError(404, 'Error Not Found');
            } else {
                if (data.UserId === UserId) {
                    next();
                } else {
                    throw createError(401, 'You are unauthorized to do that');
                }
            }
        }).catch(err => {
            next(err);
        });

}

module.exports = authorization;