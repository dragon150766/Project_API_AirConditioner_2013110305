var express = require('express');
var router = express.Router();
const staffController = require('../controllers/staffController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
const checkId = require('../middleware/checkID')

router.get('/',[passportJWT.isLogin,checkAdmin.isAdmin], staffController.index);

router.get('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId], staffController.show);

router.post('/',[passportJWT.isLogin,checkAdmin.isAdmin],[
    body('name').not().isEmpty().withMessage("Enter you name pls"),
    body('salary').not().isEmpty().withMessage("Enter you salary Pls").isNumeric().withMessage("You salary is not number"),
    body('location').isObject().withMessage("You location need to be Object lat and lgn"),
    body('location.lat').not().isEmpty().withMessage("Enter you lat Pls").isNumeric().withMessage("lat need to be number"),
    body('location.lgn').not().isEmpty().withMessage("Enter you lgn Pls").isNumeric().withMessage("lgn need to be number"),
    body('phone').not().isEmpty().withMessage("Enter you phone number pls").isLength({ min: 10, max: 10 }).withMessage("You phone number must have 10 ").isNumeric().withMessage("need to be number")
], staffController.insert);

router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId], staffController.destroy);

router.put('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId],[
    body('salary').isNumeric().withMessage("You salary is not number"),
    body('location').isObject().withMessage("You location need to be Object lat and lgn"),
    body('location.lat').isNumeric().withMessage("lat need to be number"),
    body('location.lgn').isNumeric().withMessage("lgn need to be number")
], staffController.update);

module.exports = router;