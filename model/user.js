const mongoose= require("mongoose");



const userSchema=  mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength:[6,'Password should at least 6 characters.']
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default: "user"
    },
    refreshToken:{
        type: String,
        default: ""
    }


},{timestamps: true})

const user= mongoose.model("user",userSchema);
module.exports=user;