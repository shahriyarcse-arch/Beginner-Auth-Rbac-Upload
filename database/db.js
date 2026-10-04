const mongoose= require("mongoose");

const connectToDatabse= async ()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Database Connection Successfull.");

    }
    catch(e){
        console.log("Database connection Failed.", e.message);
    }
}

module.exports=connectToDatabse;