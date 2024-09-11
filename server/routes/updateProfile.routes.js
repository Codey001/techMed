import express from 'express';
import {updateProfile, getProfile, patientInfo} from "../controllers/updateProfile.controller.js"

const router =  express.Router();

//DOCTOR AND PATIENT CAN UPDATE THEIR PROFILE
router.patch('/update', updateProfile);

//DOCTOR AND PATIENT CAN FETCH THEIR PROFILE
router.post('/get', getProfile);

//DOCTOR CAN FETCH THE PATIENT INFORMATION BEFOR THE CONSULTATION
router.post('/patientInfo', patientInfo); 

export default router;