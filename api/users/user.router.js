

const Router = require('express').Router;
const router = Router();

const authorize = require('_middleware/authorize')
const userController = require('./users.controller')
// routes
router.post('/authenticate', userController.authenticateSchema, userController.authenticate);
router.post('/register', userController.register);

module.exports = router;