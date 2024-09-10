import { Client, Environment, ApiError } from "square";
import { createConsultation } from "./consultation.controller.js";


function generateIdempotencyKey() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const randomPart = Math.random().toString(36).substr(2, 8);
  const idempotencyKey = `${timestamp}-${randomPart}`;
  return idempotencyKey.substring(0, 45);
}

async function paymentAndConsultation(req, res) {
  try {
    // Configure Square client
    const squareClient = new Client({
      environment: Environment.Sandbox, // Use Environment.Production in production
      accessToken: process.env.SQUARE_ACCESS_TOKEN, // Use environment variable for security
    });

    // const { sourceId, amount, patientName, symptoms, specialty } = req.body;

    const { sourceId, patientId, amount, specialty, symptoms, timestamp } =
      req.body;

    if (!sourceId || !amount || !patientName || !specialty) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    try {
      const idempotencyKey = generateIdempotencyKey();

      const paymentRequest = {
        sourceId: sourceId,
        idempotencyKey: idempotencyKey,
        amountMoney: {
          amount: parseInt(amount), // Ensure amount is an integer
          currency: "USD",
        },
        note: `Consultation for ${patientName} - ${specialty}`,
      };

      try {
        const response = await squareClient.paymentsApi.createPayment(
          paymentRequest
        );

        if(!response){
            console.error("Square API Error:", response.errors);
            res.status(400).json({ success: false, error: response.errors[0].detail });
            return;
        }

        const transactionId = response.result.payment.id;

        console.log("Square payment successful:", response);

      //CREATE CONSULTATION
        return await createConsultation(patientId, timestamp, symptoms, transactionId, specialty);

      } catch (error) {
        console.error("Square API Error:", error.message);
        res.status(400).json({ success: false, error: error.message });
      }

    } catch (error) {
      console.error("Payment processing error:", error);
      if (error instanceof ApiError) {
        console.error("Square API Error:", error.errors);
        res.status(400).json({ success: false, error: error.errors[0].detail });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  } catch (error) {
    console.error("Error in payment and consultation controller:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export { paymentAndConsultation };
