const express   = require("express");
const router    =express.Router();
const challzM    = require("../controllers/chalMMMCtrl");


router.post("/join", challzM.joiner);

router.get("/mChala", challzM.getUserChallenge);



module.exports = router;


