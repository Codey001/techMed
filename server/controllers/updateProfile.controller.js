
import Doctor from "../models/doctor.model.js"
import Patient from "../models/patient.model.js"

import { decrypt } from "../config/encryption.js";
import Consultation from "../models/consultation.model.js";

const updateProfile = async(req,res) =>{
    const {type} = req.body;
    if(type === "Patient"){
        const {id, gender, healthInfo} = req.body;
        if(!id){
            return res.status(400).json({message: "User not found"});
        }

        const patient = await Patient.findById({_id: id});
        if(!patient){
            return res.status(404).json({message: "Patient not found"});
        }
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.gender = gender;
        patient.healthInfo = healthInfo;

        await patient.save();
        return res.status(200).json({message: "Patient profile updated successfully"});
    }
    else if(type === "Doctor"){
        const {id, specialization} = req.body;
        if(!id){
            return res.status(400).json({message: "User not found"});
        }
        // Update doctor's profile in the database
        const doctor = await Doctor.findOne({_id: id})

        if(!doctor){
            return res.status(404).json({message: "Doctor not found"});
        }

        doctor.firstName = firstName;
        doctor.lastName = lastName;
        doctor.specialization = specialization;
        await doctor.save();
        return res.status(200).json({message: "Doctor profile updated successfully"});

    }else{
        return res.status(400).json({message: "Invalid profile type"});
    }
}

const getProfile = async (req, res) => {
    const {id, type} = req.body;
    console.log([id, type]);

    if(!id || !type){
        return res.status(400).json({message: "Incomplete request parameters"});
    }

    if(!id){
        return res.status(400).json({message: "User not found"});
    }

    if(type === "Patient"){
        const patient = await Patient.findById({_id: id});
        if(!patient){
            return res.status(404).json({message: "Patient not found"});
        }
        console.log(patient)
        const decryptedPatient = patient.toObject({ getters: true });

        return res.status(200).json(decryptedPatient);
    }else if(type === "Doctor"){
        const doctor = await Doctor.findById({_id: id});
        if(!doctor){
            return res.status(404).json({message: "Doctor not found"});
        }
        return res.status(200).json(doctor);
    }else{
        return res.status(400).json({message: "Invalid profile type"});
    }
}

const patientInfo = async (req,res) => {
    try {
        const {doctorId, consultationId} = req.body;
        
        const consultation = await Consultation.findById({_id: consultationId});
        if(!consultation){
            return res.status(404).json({message: "Consultation not found"});
        }

        if(consultation.doctor !== doctorId){
            return res.status(403).json({message: "Unauthorized access"});
        }

        const patient = await Patient.findById({_id: consultation.patient});
        if(!patient){
            return res.status(404).json({message: "Patient not found"});
        }

        const decryptedPatient = patient.toObject({ getters: true });
        return res.status(200).json(decryptedPatient);

    } catch (error) {
        console.log("Error fetching patient info", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
    

}


export {updateProfile, getProfile, patientInfo}