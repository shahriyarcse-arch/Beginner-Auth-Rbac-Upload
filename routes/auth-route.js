const express= require("express");
const {registerUser,loginUser,logout,refreshToken}=require("../controllers/auth-controller.js");



const router=express.Router();





//Child Routes

router.post("/register",registerUser);
router.post("/login",loginUser );
router.post("/logout",logout );
router.post("/refresh", refreshToken);


module.exports=router;