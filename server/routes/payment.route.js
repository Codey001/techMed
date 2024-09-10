import express from 'express';
import {paymentAndConsultation} from '../controllers/payment.controller.js'

const router = express.Router();

router.post("/", paymentAndConsultation)

export default router;