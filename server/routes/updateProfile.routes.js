import express from 'express';
import {updateProfile, getProfile, patientInfo} from "../controllers/updateProfile.controller.js"

const router =  express.Router();

router.post('/update', updateProfile);
router.post('/get', getProfile);
router.post('/patientInfo', patientInfo);

export default router;