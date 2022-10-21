

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

router.post('/add-setting',  articalController.addSetting);
router.put('/update-setting/:id',  articalController.updateSetting);

router.get('/get-setting/:client_id',  articalController.getSetting);
router.get('/check-qualitative/:client_id',  articalController.getQualitativeCheck);

router.get('/get-setting',  articalController.getSettingAll);

router.get('/getall',  articalController.getArtical);

// routes
router.get('/viewlist',  articalController.getList);
router.delete('/delete-setting/:id',  articalController.deleteSetting);



module.exports = router;