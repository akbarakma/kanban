const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const authorization = require('../middlewares/authorization');


router.get('/', TaskController.showTask);
router.post('/', TaskController.createTask);
router.use('/:id', authorization);
router.get('/:id', TaskController.showTaskById);
router.delete('/:id', TaskController.deleteTask);
router.put('/:id', TaskController.updateTask);


module.exports = router;