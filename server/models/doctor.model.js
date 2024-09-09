import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
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