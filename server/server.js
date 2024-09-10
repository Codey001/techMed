import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes.js";
import updateProfileRoute from "./routes/updateProfile.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import specializationRoute from "./routes/specialization.route.js"
import consultationRoute from "./routes/consultation.route.js"
import paymentRoute from "./routes/payment.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //to parse the incoming request from Json payload(from req.body)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//TODO : PROTECT THE ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/profile", updateProfileRoute);
app.use("/api/specialization", specializationRoute)
app.use("/api/consultation",consultationRoute);

app.use("/api/payment", paymentRoute);


app.listen(PORT, () => {
  connectToMongoDB().then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
});
