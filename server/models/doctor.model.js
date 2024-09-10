import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
          },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }

)

const Doctor = mongoose.model("Doctor", doctorSchema)
export default Doctor;