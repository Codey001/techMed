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
import protectRoute from "./middlewares/protectRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
//ROUTES
app.use("/api/auth", authRoutes); 
app.use("/api/profile",protectRoute, updateProfileRoute); 
app.use("/api/specialization",protectRoute, specializationRoute)
app.use("/api/consultation",protectRoute, consultationRoute);
app.use("/api/payment",protectRoute, paymentRoute);


app.listen(PORT, () => {
  connectToMongoDB().then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
});
