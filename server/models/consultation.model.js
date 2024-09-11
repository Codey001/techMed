import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',  
    
  },
  timestamp: {
    type: Date, 
    required: true,

  },
  symptoms: {
    type: String, 
    required: true
  },
  diagnosis: {
    type: String,
    default: "",
  },
  prescription: {
    type: String, 
    default: "",
  },
  consultationType: {
    type: String,
    enum: ['Telemedicine'],  
    default: 'Telemedicine'
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed'],  
    default: 'Pending'
  },
  //meeting url
  meetingRoomUrl: {
    default:"",
    type: String
  },
  //payment id
  transactionId: {
    type: String,
    required: true
  },
  specialty: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now   
  }
  
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;
