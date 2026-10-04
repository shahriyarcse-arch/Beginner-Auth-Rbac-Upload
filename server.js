require("dotenv").config();
const connectTodatabase= require("./database/db.js");
const express=require("express");
const authRouter=require("./routes/auth-route.js");
const homeMiddleware=require("./routes/home-route.js");
const adminMiddleware=require("./routes/admin-route.js");


const PORT=process.env.PORT || 3000;



const app= express();




//connect to database
connectTodatabase();


//Middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(`Logging with ${req.url} URL and ${req.method} METHOD.`);
    next();
});


//Parents Route
app.use("/api/auth",authRouter);
app.use("/api/home", homeMiddleware);
app.use("/api/admin",adminMiddleware);




//Listen
app.listen(PORT,()=>{
    console.log(`Server Is Running In ${PORT} PORT.`)
})