import express, {Request, Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import studentRoutes from "./routes/student";
import adminRoutes from "./routes/admin"
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/students", studentRoutes)
app.use("/api/admin", adminRoutes )

app.listen(7000, ()=>{
    console.log("Server running on localhost:7000")
})
