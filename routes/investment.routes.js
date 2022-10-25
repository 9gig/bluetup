const express   = require("express");
const router    =express.Router();
const invController = require("../controllers/investmentCtrl");

// add investment by wallet/card
router.post("/invest", invController.invest);
router.get("/myInvestments/:id", invController.getMyInvestments);
router.get("/getDeals/", invController.getDeals);
router.get("/totalBal/:id", invController.totalBal);

//get all investments

//withdraw all profits

module.exports = router;