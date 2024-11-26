import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import connectDB from "./utils/db.js";
import router from  "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import JobRoute from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

// importing our .env file from backend folder
import dotenv from "dotenv";
// configur our .env file in this current module for use it
dotenv.config({})

const app = express();



app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"I'm Coming from Bakend",
        success:true
    })
})

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// initialinzing our port 
// proccess.env.PORT comes from .env file if present
const PORT = process.env.PORT || 3000;

//  APIs
 app.use("/api/v1/user", router);
 app.use("/api/v1/company", companyRoutes);
 app.use("/api/v1/job", JobRoute);
 app.use("/api/v1/application", applicationRoutes);

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is running at PORT: ${PORT}`)
})