


const adminMiddleware= (req,res,next)=>{

    if(req.userinfo.role!=="admin"){
        return res.status(400).json({
            success:false,
            message:"admin access Denied."
        })
    }
    next();

    

}

module.exports={adminMiddleware};