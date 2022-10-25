const express   = require("express");
const router    =express.Router();
const refed     =require("../controllers/referCtrl");



router.post("/createRef", refed.create);
router.post("/addRef", refed.add);
router.get("/getRef/:id", refed.getRef);


module.exports = router;
