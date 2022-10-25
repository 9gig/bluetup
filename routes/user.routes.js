const express   = require("express");
const router    =express.Router();
const userController    = require("../controllers/userCtrl");
const encController     = require("../controllers/hashCtrl");
const saver             = require("../controllers/savingsCtrl");



//Signup Route
router.post("/register",userController.register);
router.post("/login",userController.login);
router.put("/updatepersonal", userController.updatePersonal);
router.put("/addkin", userController.addNextofKin);
// router.get("/radTest", userController.rad);
router.post("/encData", encController.toHash);
router.get("/dcryptData/:id", encController.dicrypt);







//Login Route

module.exports = router;