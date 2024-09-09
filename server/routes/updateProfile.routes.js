import express from 'express';
import {updateProfile, getProfile} from "../controllers/updateProfile.controller.js"

const router =  express.Router();

router.post('/update', updateProfile);
router.post('/get', getProfile);

export default router;