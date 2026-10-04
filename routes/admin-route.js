const express=require("express");
const {authMiddleware}=require("../middlewares/auth-middleware");
const {adminMiddleware}=require("../middlewares/admin-middleware");


const router=express.Router();


router.get("/admin", authMiddleware,adminMiddleware,(req,res)=>{
    console.log("Wlcome to admin");
    res.status(200).json({
        success: true,
        message:" Welcome to adminpage"
    })
})

module.exports=router;