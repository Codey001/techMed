import express from 'express';
import {paymentAndConsultation} from '../controllers/payment.controller.js'

const router = express.Router();

//MAKE PAYMENT AND CREATE NEW CONSULTATION
router.post("/", paymentAndConsultation)

export default router;