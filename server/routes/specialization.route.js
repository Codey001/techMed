import express from 'express';
import {createSpecialization, readSpecialization} from '../controllers/specialization.controller.js'


const router = express.Router();
router.post("/create", createSpecialization);
router.post("/read", readSpecialization);

export default router;