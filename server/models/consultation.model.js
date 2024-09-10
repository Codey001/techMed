import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',   // Reference to the Patient model
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',   // Reference to the Doctor model
  },
  timestamp: {
    type: Date, // Combined Date and Time as a single timestamp
    required: true,

  },
  symptoms: {
    type: String,   // Summary of symptoms reported by the patient
    required: true
  },
  diagnosis: {
    type: String,   // Doctor's diagnosis after the consultation
    default: "",
  },
  prescription: {
    type: String,   // Prescription details or medications suggested
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
