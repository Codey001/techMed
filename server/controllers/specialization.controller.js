import Specialization from "../models/specialization.model.js"

//CREATE NEW SPECIALIZATION FOR DOCTOR
async function createSpecialization(req,res){
    try {
        const {name, amount} = req.body;
        if(!name ||!amount){
            return res.status(400).json({message: "Specialization name and amount are required"});
        }

        const newSpecialization = new Specialization({type: name, fees: amount});
        await newSpecialization.save();

        res.status(201).json({message: "Specialization created successfully", specialization: newSpecialization});

    } catch (error) {
        console.log("Error in creating specialization:", error.message);
        res.status(500).json({error: "Internal server error"});
    }   
}

// FETCH THE LIST OF ALL THE AVAILABLE SPECIALIZATIONS OF DOCTOR
async function readSpecialization(req,res){
    try {
        const records = await Specialization.find({});

        if(records.length > 0){
            res.status(200).json({records: records});
        }else{
            res.status(200).json({records: records});
        }
    } catch (error) {
        console.log("Error in fetching records:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export {createSpecialization, readSpecialization}