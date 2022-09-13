

const Router = require('express').Router;
const router = Router();

const authorize = require('_middleware/authorize')
const articalController = require('./artical.controller')
const userController = require('../users/users.controller')

// routes
router.post('/',  articalController.processExcels);
router.get('/getall',  articalController.getArtical);

// routes
router.post('/authenticate', userController.authenticateSchema, userController.authenticate);
router.post('/register', userController.register);

module.exports = router;