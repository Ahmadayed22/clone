const express = require("express");
const {signUp,logIn,signOut} = require("../controller/auth");


const router = express.Router();

router.post("/signup", signUp)
router.post("/login" ,logIn)
router.post("/signout" ,signOut)
module.exports = router;