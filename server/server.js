import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes.js'
import updateProfileRoute from './routes/updateProfile.routes.js'
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming request from Json payload(from req.body)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.get('/', (req,res) => {
    res.status(200).send("App is running");
})


app.use("/api/auth", authRoutes);
app.use("/api/profile", updateProfileRoute);
// app.use("/api/consultation",);
// app.use("/api/getPatientHistory");


app.listen(PORT, () => {
    connectToMongoDB()
    .then(() => {
        console.log(`Server is running on port ${PORT}`);
    })
})
