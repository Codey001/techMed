import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Specialization = mongoose.model("Specialization", specializationSchema);
export default Specialization;
