const express=require("express");
const {authMiddleware}=require("../middlewares/auth-middleware");

const router=express.Router();


router.get("/welcome",authMiddleware, (req,res)=>{
    console.log("Wlcome to Home");
    res.status(200).json({
        success: true,
        message:" Welcome to Home"
    })
})

module.exports=router;