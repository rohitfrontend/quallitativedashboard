

const Router = require('express').Router;
const router = Router();

const authorize = require('_middleware/authorize')
const articalController = require('./artical.controller')
// routes
router.post('/',  articalController.processExcel);

module.exports = router;