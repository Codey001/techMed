import Consultation from "../models/consultation.model.js";
import axios from 'axios';

const DAILY_TOKEN = process.env.ROOM_TOKEN;

async function createConsultation(patientId, time, symptoms, transactionId, specialty) {
    try {
        const newConsultation = new Consultation({
            patient: patientId,
            timestamp: time,
            symptoms: symptoms,
            transactionId: transactionId,
            specialty: specialty
        });
        
        await newConsultation.save();
        
        return newConsultation; // Return the created consultation
    } catch (error) {
        console.error("Error creating consultation:", error.message); // Log the error for debugging
        throw new Error("Failed to create consultation"); // Throw a meaningful error
    }
}

async function assignDoctor(req,res){
    try {
        const {consultationId, doctorId} = req.body; 

        const consultation = Consultaion.findById({_id: consultationId})
        if(!consultation){
            return res.status(404).json({message: "Consultation not found"});
        }

        consultation.doctor = doctorId;
        consultation.status = "Confirmed";

        await consultation.save();

        return res.status(200).json(consultation); // Return the updated consultation

    } catch (error) {
        console.error("Error assigning doctor:", error.message); // Log the error for debugging
        throw new Error("Failed to assign doctor"); // Throw a meaningful error
    }
}

async function createRoomAPI() {
    try {
        const response = await fetch('https://api.daily.co/v1/rooms', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DAILY_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
  
                "properties": {
                  "start_audio_off": true,
                "enable_chat": true,
                  "start_video_off": true
                }
              }
              )
        });

        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Error making POST request:', error.message);
        throw new Error('Failed to make POST request');
    }
}

async function deleteRoomAPI(roomUrl) {
    try {
        const url = roomUrl; // Construct the URL with the room ID
        
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DAILY_TOKEN}` // Set the Bearer token in the Authorization header
            }
        });
        
        console.log('Room deleted successfully:', response.data); // Log the response from the API
    } catch (error) {
        console.error('Error deleting room:', error.message); // Handle errors
    }
}

async function createRoom(req,res){

    try {
        const {userId, consultationId} = req.body;
        
        const consultation = Consultaion.findById({_id: consultationId});
        if(!consultation){
            return res.status(404).json({message: "Consultation not found"});
        }
        if(userId === consultation.patient || userId===consultation.doctor){
            //CREATE ROOM

            try {
                const roomInfo = await createRoomAPI();
                consultation.meetingRoomUrl = roomInfo.url;
                await consultation.save();
                res.status(200).json({message: "Room successfully created", roomInfo: roomInfo.url})

            } catch (error) {
                console.log("Error creating room:", error.message);
                res.status(400).json({message: "Error creating room"});
            }

        }else{
            return res.status(403).json({message: "User is not authorized to create a room"});
        }
        
    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

async function updateConsultationDetails(req,res){
    try {
        const {doctorId, consultationId, diagnosis, prescription} = req.body;
        
        const consultation = Consultaion.findById({_id: consultationId});

        if(!consultation){
            return res.status(404).json({message: "Consultation not found"});
        }

        //check authorized doctor
        if(consultation.doctor != doctorId){
            return res.status(403).json({message: "User is not authorized to update consultation details"});
        }

        consultation.status = "Completed";
        consultation.diagnosis = diagnosis;
        consultation.prescription = prescription;
        await consultation.save();


        //delete room
        try {
            const roomDeleted = await deleteRoomAPI(consultation.meetingRoomUrl);
            
        } catch (error) {
            console.log("Error deleting room:", error.message);
            res.status(400).json({message: "Error deleting room"});
        }

    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

async function patientConsultations(req,res){
    try {
        const {type, patientId} = req.body;

        if(type != "Patient"){
            return res.status(403).json({message: "User is not authorized to view consultations"});
        }
        
        const consultations = await Consultation.find({patient: patientId});
        
        if(!consultations){
            return res.status(404).json({message: "No consultations found"});
        }

        //send all the consultaions
        res.status(200).json(consultations); // Return the updated consultation

    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

async function doctorConsultations(req,res){
    try {
        const {type, doctorId} = req.body;
        
        if(type!= "Doctor"){
            return res.status(403).json({message: "User is not authorized to view consultations"});
        }

        const consultations = await Consultation.find({doctor: doctorId});
        
        if(!consultations){
            return res.status(404).json({message: "No consultations found"});
        }

        res.status(200).json(consultations); // Return the updated consultation
        
    } catch (error) {
        console.error("Error updaing consultation:", error.message);
        res.status(500).json({message: "Internal server error"});        
    }
}

async function consultationDetails(req,res){
    try {
        const {doctorId, patientId, consultationId} = req.body;

        const consultation = await Consultation.findById({_id:consultationId});

        if(!consultation){
            return res.status(404).json({message: "No consultations found"});
        }

        if(consultation.patient === patientId || consultation.doctor === doctorId){
            res.status(200).json({details: consultation})
        }else{
            return res.status(403).json({message: "User is not authorized to access consultation details"});   
        }

    } catch (error) {
        console.error("Error fetching details:", error.message);
        res.status(500).json({message: "Internal server error"});   
    }
}


export {createConsultation,updateConsultationDetails,createRoom,assignDoctor, patientConsultations,doctorConsultations, consultationDetails}