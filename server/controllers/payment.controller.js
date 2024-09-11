import { Client, Environment, ApiError } from "square";
import { createConsultation } from "./consultation.controller.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//GENERATE UNIQUE ID FOR PAYMENT
function generateIdempotencyKey() {
  const idempotencyKey = uuidv4();
  return idempotencyKey;
}

//MAKE PAYMENT AND CREATE NEW CONSULTATION
async function paymentAndConsultation(req, res) {
  try {
    const { sourceId, patientId, amount, specialty, symptoms, timestamp } =
      req.body;

    if (
      !sourceId ||
      !amount ||
      !patientId ||
      !specialty ||
      !symptoms ||
      !timestamp
    ) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    try {
      const data = {
        source_id: "cnon:card-nonce-ok",
        idempotency_key: generateIdempotencyKey(),
        amount_money: {
          amount: Math.round(parseFloat(amount) * 100),
          currency: "USD",
        },
        note: `Consultation for ${patientId} - ${specialty}`,
      };

      try {
        const url = process.env.PAYMENT_API_URL;
        const headers = {
          "Square-Version": "2024-08-21",
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`, 
          "Content-Type": "application/json",
        };
        axios
          .post(url, data, { headers })
          .then((response) => {
            const transactionId = response.data.payment.id;

            // CREATE CONSULTATION
            createConsultation(
              patientId,
              timestamp,
              symptoms,
              transactionId,
              specialty
            )
              .then((consultation) => {
                res.status(200).json({ consultation: consultation });
              })
              .catch((consultationError) => {
                console.error(
                  "Consultation Creation Error:",
                  consultationError
                );
                res
                  .status(500)
                  .json({ message: "Error creating consultation" });
              });
          })
          .catch((error) => {
            console.error("Payment Error:", error);
            res.status(400).json({ message: "Error making payment" });
          });
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
