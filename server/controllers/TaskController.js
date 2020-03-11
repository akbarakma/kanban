const { Task } = require('../models');
const createError = require('../helpers/createError');

class TaskController {
    static showTask (req, res, next) {
        let id = Number(req.UserData.id);
        Task.findAll({ where: { UserId: id } })
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                next(err);
            });
    }
    static showTaskById (req, res, next) {
        let id = Number(req.params.id);
        Task.findOne({ where: { id } })
            .then(data => {
                if (!data) {
                    throw createError(404, 'Error Not Found');
                } else {
                    res.status(200).json(data);
                }
            }).catch(err => {
                next(err);
            });
    }
    static createTask (req, res, next) {
        let { title, category, description } = req.body;
        let obj = {
            title,
            category,
            description,
            UserId: req.UserData.id
        };
        Task.create(obj)
            .then(data => {
                res.status(201).json(data);
            }).catch(err => {
                next(err);
            });
    }
    static deleteTask (req, res, next) {
        let id = Number(req.params.id);
        Task.destroy({ where: { id } })
            .then(() => {
                res.status(201).json({
                    msg: 'Berhasil'
                })
            }).catch(err => {
                next(err);
            });
    }
    static updateTask (req, res, next) {
        let id = Number(req.params.id);
        let { title, category, description } = req.body;
        let obj = { title, category, description };
        Task.update(obj, { where: { id } })
            .then(() => {
                res.status(200).json(obj);
            }).catch(err => {
                next(err);
            });
        
    }

}

module.exports = TaskController;