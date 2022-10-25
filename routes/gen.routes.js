const express   = require("express");
const router    = express.Router();
const genController = require("../controllers/genCtrl");


router.post("/addBalance", genController.addBalance);
router.get("/getBalance/:id", genController.getBalance);

module.exports = router;