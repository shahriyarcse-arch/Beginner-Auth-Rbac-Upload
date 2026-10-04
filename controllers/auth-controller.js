const mongoose= require("mongoose");
const user=require("../model/user.js");
const bcryptjs=  require("bcryptjs");
const jwt=require("jsonwebtoken");
const registerUser= async (req,res) => {
    try{
        //get user info
        const {firstname,lastname,email,phone,password,role }=req.body;
        //check user 
        const checkUser= await user.findOne({
            $or:[{email}, {firstname}]
        })

        if(checkUser){
            return res.status(404).json({
                success: false,
                message: "USer Aleady Exist, Login."
            })
        }


        //hash password

        const salt = await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password, salt);


        //create
        const createUser= await user.create({
            firstname,
            lastname,
            email,
            phone,
            password:hashPassword,
            role
        })

        if(createUser){
             res.status(201).json({
            success: true,
            message:"New User Created SuccessFully.",
            data: createUser
        })

        }
        else{
            res.status(400).json({
                success: false,
                message:"User Created Failed."
            })
        }

    }
    catch(e){
        console.log("User Register Failed.", e.message);
        res.status(500).json({
            success: false,
            message: "User Register Failed, Server Problem."
        })
    }
}

const loginUser= async (req,res)=>{
    try{
        const {firstname, password}= req.body;
        const checkUser= await user.findOne({firstname});

        if(!checkUser){
            return res.status(404).json({
                success: false,
                message: "USer Not Exist, Register First."
            })
        }

        const isPasswordMatch = await bcryptjs.compare(password, checkUser.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials / password does not match."
            })
        }

        //create Access Token
        const accessToken= await jwt.sign({
            id: checkUser._id,
            firstname: checkUser.firstname,
            lastname: checkUser.lastname,
            phone: checkUser.phone,
            email:checkUser.email,
            role: checkUser.role

        }, process.env.JWT_SECRET_KEY,{expiresIn: "20m"});

        // Create refresh Token

        const refreshToken= await jwt.sign({
            id: checkUser._id            
        }, process.env.JWT_REFRESH_KEY,{expiresIn: "7d"});


        checkUser.refreshToken=refreshToken;
        await checkUser.save();


        return res.status(200).json({
            success: true,
            message: "User lOgin Successfully.",
            accessToken: accessToken,
            refreshToken: refreshToken
        })

    }
    catch(e){
        console.log(("Internal Server Error.", e.message));
         res.status(500).json({
            success: false,
            message: "User Register Failed, Server Problem."
        })
    }
}




const logout = async (req,res)=>{
    try{
        const {refreshToken}= req.body;
        if(!refreshToken){
            return res.status(400).json({
                success: false,
                message: " Refrsh token not found",

            })

        }
//find user
        const findUSer= await user.findOne({refreshToken});

        if(findUSer){
            findUSer.refreshToken="";
            await findUSer.save();
        }
        return res.status(200).json({
            succ:true,
            message: "Uer logout Successfull."
        })


    }
    catch(e){
        console.log(("Internal Server Error.", e.message));
         res.status(500).json({
            success: false,
            message: "User Register Failed, Server Problem."
        })

    }
}

const refreshToken= async(req,res)=>{
    try{
        const {refreshToken} =req.body;

        if(!refreshToken){
            return res.status(404).json({
                success: false,
                message: "Refresh token required."
            })

        }

        //verify Refrsh token

        const verifyRefreshToken=jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY);
        if(!verifyRefreshToken){
            return res.status(404).json({
                success: false,
                message: " Refrsh Token  is not valid."
            })
        }

        const findUser= await user.findById(verifyRefreshToken.id);
        if(!findUser){
            return res.status(401).json({
                success: false,
                messahe: " User is not found."
            })
        }

        const newAcessToken= await jwt.sign({
            id: findUser.id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            phone: findUser.phone,
            email: findUser.email,
            role: findUser.role
        },process.env.JWT_REFRESH_KEY,{expiresIn: "10d"})
        return res.status(200).json({
            success: true,
            message: "Access token Generate succcessfully.",
            accessToken: newAcessToken

        })


    }
    catch(e)
    {
        console.log(("Internal Server Error.", e.message));
         res.status(500).json({
            success: false,
            message: "User Register Failed, Server Problem."
        })


    }
}

module.exports={registerUser,loginUser,logout,refreshToken};