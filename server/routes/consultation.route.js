import express from 'express';
import {createConsultation,updateConsultationDetails,createRoom,assignDoctor, patientConsultations,doctorConsultations, consultationDetails}from '../controllers/consultation.controller.js'


const router = express.Router();
router.post('/create', createConsultation);
router.patch('/doctorPrescription', updateConsultationDetails);
router.patch('/createRoom', createRoom);
router.patch('/assignDoctor', assignDoctor);
router.post('/detials', consultationDetails)

router.post("/patient/allConsultations", patientConsultations);
router.post("/doctor/allConsultations", doctorConsultations);

export default router;
