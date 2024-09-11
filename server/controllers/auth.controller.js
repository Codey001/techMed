import bcrypt from "bcryptjs";
import Doctor from "../models/doctor.model.js"
import Patient from "../models/patient.model.js"

import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { type,name, email, password, confirmPassword } = req.body;
    console.log([type,name, email, password, confirmPassword])

    if (!email || !password || !confirmPassword, !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    let user;
    if (type === "Patient") {
      user = await Patient.findOne({ email });
    } else if (type === "Doctor") {
      user = await Doctor.findOne({ email });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    // USER ALREADY EXIST
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    let newUser;
    if (type === "Patient") {
      newUser = new Patient({name, email, passwordHash: hashedPassword });
    } else if (type === "Doctor") {
      newUser = new Doctor({name, email, passwordHash: hashedPassword });
    }else{
      return res.status(400).json({ error: "Invalid user type" });
    }

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);  

    return res.status(201).json({ _id: newUser._id, type: type });

  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { type, email, password } = req.body;

    if (!type || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user;
    if (type === "Patient") {
      user = await Patient.findOne({ email });
    } else if (type === "Doctor") {
      user = await Doctor.findOne({ email });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({ _id: user._id, type: type });

  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { login, signup, logout };
