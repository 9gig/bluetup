const express   = require("express");
const router    =express.Router();
const saver             = require("../controllers/savingsCtrl");

//Get all savings data
router.get("/getSavingsProfile/:id", saver.getSavingsProfile);

//routes to deposit
router.post("/createSavings", saver.addSavings);

//route to withdraw

//routes for auto save



module.exports = router;