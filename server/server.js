import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { Client, Environment, ApiError } from "square";

import authRoutes from "./routes/auth.routes.js";
import updateProfileRoute from "./routes/updateProfile.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming request from Json payload(from req.body)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("App is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", updateProfileRoute);
// app.use("/api/consultation",);
// app.use("/api/getPatientHistory");
// Configure Square client
const squareClient = new Client({
  environment: Environment.Sandbox, // Use Environment.Production in production
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Use environment variable for security
});
app.post("/api/process-payment", async (req, res) => {
  console.log("Payment request received:", req.body);
  const { sourceId, amount, patientName, symptoms, specialty } = req.body;

  if (!sourceId || !amount || !patientName || !specialty) {
    console.log("Missing required fields");
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    console.log("Generating idempotency key...");
    const idempotencyKey = generateIdempotencyKey();
    console.log("Idempotency key generated:", idempotencyKey);

    console.log("Preparing payment request...");
    const paymentRequest = {
      sourceId: sourceId,
      idempotencyKey: idempotencyKey,
      amountMoney: {
        amount: parseInt(amount * 100), // Ensure amount is an integer
        currency: "USD",
      },
      note: `Consultation for ${patientName} - ${specialty}`,
    };
    console.log("Payment request prepared:", paymentRequest);

    console.log("Sending payment request to Square...");
    const response = await squareClient.paymentsApi.createPayment(
      paymentRequest
    );
    console.log("Payment response received:", response);

    console.log("Payment successful:", response.result);
    res.json({ success: true, paymentId: response.result.payment.id });
  } catch (error) {
    console.error("Payment processing error:", error);
    if (error instanceof ApiError) {
      console.error("Square API Error:", error.errors);
      res.status(400).json({ success: false, error: error.errors[0].detail });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

function generateIdempotencyKey() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const randomPart = Math.random().toString(36).substr(2, 8);
  const idempotencyKey = `${timestamp}-${randomPart}`;
  return idempotencyKey.substring(0, 45);
}
app.listen(PORT, () => {
  connectToMongoDB().then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
});
