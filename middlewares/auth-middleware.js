
const jwt=require("jsonwebtoken");


const authMiddleware= (req,res,next)=>{

    const authheader= req.headers["authorization"];
    const token=authheader && authheader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Token is rquired."
        })
    }

    try{
        const verify= jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("Token info: ", verify);
        req.userinfo=verify;

        next();


    }
    catch(e)
    {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: e.message
        })
    }
    



}

module.exports={authMiddleware};