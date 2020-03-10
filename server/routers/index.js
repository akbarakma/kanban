const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const tasks = require('./tasks');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use(authentication);
router.use('/tasks', tasks);

module.exports = router;