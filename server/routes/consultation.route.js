import express from 'express';
import {createConsultation,updateConsultationDetails,joinMeeting,assignDoctor, patientConsultations,doctorConsultations, consultationDetails, rescheduleConsultation,pendingPatients} from '../controllers/consultation.controller.js'


const router = express.Router();

//DOCTOR CAN UPDATE THE PRESCRIPTION AFTER THE CONSULTATION IS OVER
router.patch('/doctorPrescription', updateConsultationDetails);

//DOCTOR AND PATIENT CAN JOIN THE CONSULTATION MEETING
router.patch('/joinMeeting', joinMeeting);

//DOCTOR CAN ACCEPT A CONSULTATION AND HE WILL BE ASSIGNED TO THAT CONSULTATION
router.patch('/assignDoctor', assignDoctor);

//PATIENT CAN RESCHEDULE THE CONSULTATION
router.patch('/reschedule',rescheduleConsultation );

//DOCTOR AND PATIENT CAN GET INFORMATION ABOUT PARTICULAR CONSULTATION
router.post('/details', consultationDetails)

//PATIENT CAN GET ALL THE COMPLETED CONSULTATIONS THAT HE HAS MADE
router.post("/patient/allConsultations", patientConsultations);

//DOCTOR CAN GET ALL THE CONSULTATIONS THAT HE IS ASSOCIATED WITH
router.post("/doctor/allConsultations", doctorConsultations);

//DOCTOR CAN GET THE LIST OF ALL THE PATIENT THAT HAVE CREATED COMPLAINT FOR THE SAME SPECIALIZATION AS DOCTOR
router.post("/doctor/allPatients",pendingPatients)

export default router;
