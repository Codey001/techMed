import express from 'express';
import {createConsultation,updateConsultationDetails,joinMeeting,assignDoctor, patientConsultations,doctorConsultations, consultationDetails, rescheduleConsultation}from '../controllers/consultation.controller.js'


const router = express.Router();
router.post('/create', createConsultation);
router.patch('/doctorPrescription', updateConsultationDetails);
router.patch('/joinMeeting', joinMeeting);
router.patch('/assignDoctor', assignDoctor);
router.post('/detials', consultationDetails)
router.patch('/reschedule',rescheduleConsultation );

router.post("/patient/allConsultations", patientConsultations);
router.post("/doctor/allConsultations", doctorConsultations);

export default router;
