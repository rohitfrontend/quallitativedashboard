

const Router = require('express').Router;
const router = Router();

const authorize = require('_middleware/authorize')
const articalController = require('./artical.controller')
const userController = require('../users/users.controller')
const fileMiddleware = require('../_middleware/file')
// routes
router.post('/', fileMiddleware.fileUpload("qualitative").fields([{
    name: 'upload'
}]),
fileMiddleware.assignImageDataToBody("fields", ["upload"]),  articalController.saveArtical);
router.get('/getall',  articalController.getArtical);

// routes
router.get('/viewlist',  articalController.getList);

module.exports = router;