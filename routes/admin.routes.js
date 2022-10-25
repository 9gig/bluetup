const express   = require("express");
const router    =express.Router();
const adminController = require('../controllers/adminCtrl');
const upload    = require('../utils/multer');


router.post('/addDeal', upload.array('image', 2), adminController.addNewDeal);
router.post('/addSavingsType', adminController.addSavings);
router.post('/setPass', adminController.pass);
router.post('/login', adminController.login);
router.get('/getUsers', adminController.getUsers);
router.get('/getDeals', adminController.getDeals);
router.get('/getInv', adminController.getInvestments);
router.get('/getSavings', adminController.getSavings);


module.exports = router;




