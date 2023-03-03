var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
const checkId = require('../middleware/checkID')

/* GET users listing. */
router.get('/', productController.index);
router.get('/user',[passportJWT.isLogin,checkAdmin.isAdmin], productController.user);
router.get('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId],productController.show);
router.post('/',[passportJWT.isLogin,checkAdmin.isAdmin],[
    body('name').not().isEmpty().withMessage("Enter you ProductName pls"),
    body('brand').not().isEmpty().withMessage("Enter you ProductBrand pls"),
    body('insurance').not().isEmpty().withMessage("Enter you ProductInsurance Pls").isNumeric().withMessage("You salary need to be Number"),
    body('price').not().isEmpty().withMessage("Enter you ProductPrice Pls").isNumeric().withMessage("You Price need to be Number")     
],productController.insert);
router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId], productController.destroy);
router.put('/:id',[passportJWT.isLogin,checkAdmin.isAdmin,checkId.checkId],[
    body('name').not().isEmpty().withMessage("Enter you ProductName pls"),
    body('brand').not().isEmpty().withMessage("Enter you ProductBrand pls"),
    body('insurance').not().isEmpty().withMessage("Enter you ProductInsurance Pls").isNumeric().withMessage("You salary need to be Number"),
    body('price').not().isEmpty().withMessage("Enter you ProductPrice Pls").isNumeric().withMessage("You Price need to be Number")     
],productController.update);


module.exports = router;