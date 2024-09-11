import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";


const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }


    const doctor = await Doctor.findById(decoded.userId).select("-password");
    console.log(doctor);

    const patient = await Patient.findById(decoded.userId).select("-password");
    console.log(patient);

    if(!patient && !doctor){
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
