import express from 'express';
import {createSpecialization, readSpecialization} from '../controllers/specialization.controller.js'


const router = express.Router();

//CREATE NEW SPECIALIZATION IN THE DATABASE
router.post("/create", createSpecialization);

//READ ALL SPECIALIZATIONS IN THE DATABASE
router.post("/read", readSpecialization);

export default router;