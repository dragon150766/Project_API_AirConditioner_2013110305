var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
const checkId = require('../middleware/checkID')

/* GET users listing. */
router.get('/',[passportJWT.isLogin,checkAdmin.isAdmin], userController.index);
router.post('/',[
    body('name').not().isEmpty().withMessage("Enter you name pls"),
    body('email').not().isEmpty().withMessage("Pls enter you E-mail").isEmail().withMessage("You format is not e-mail"),
    body('password').not().isEmpty().withMessage("Pls enter you password").isLength({ min: 5 }).withMessage("You password should have 5 or more"),
    body('location').isObject().withMessage("You location need to be Object lat and lgn"),
    body('location.lat').not().isEmpty().withMessage("Enter you lat Pls").isNumeric().withMessage("lat need to be number"),
    body('location.lgn').not().isEmpty().withMessage("Enter you lgn Pls").isNumeric().withMessage("lgn need to be number"),
    body('phone').not().isEmpty().withMessage("Enter you phone number pls").isLength({ min: 10, max: 10 }).withMessage("You phone number must have 10 ").isNumeric().withMessage("need to be number")

],userController.register);
router.post('/login',[
    body('email').not().isEmpty().withMessage("Pls enter you E-mail").isEmail().withMessage("You format is not e-mail"),
    body('password').not().isEmpty().withMessage("Pls enter you password").isLength({ min: 5 }).withMessage("You password should have 5 or more")

], userController.login);
router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId], userController.destroy);
router.put('/me',[passportJWT.isLogin],[
    body('location').isObject().withMessage("You location need to be Object lat and lgn"),
    body('location.lat').isNumeric().withMessage("lat need to be number"),
    body('location.lgn').isNumeric().withMessage("lgn need to be number")
], userController.update);
router.get('/me', [passportJWT.isLogin] ,userController.profile);
router.get('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId], userController.show);

module.exports = router;