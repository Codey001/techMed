import bcrypt from "bcryptjs";
import Doctor from "../models/doctor.model.js"
import Patient from "../models/patient.model.js"

import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { type, email, password, confirmPassword } = req.body;
    console.log([type, email, password, confirmPassword])

    // Validate inputs
    if (!email || !password || !confirmPassword) {
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

    // Check if user already exists
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user based on the type
    let newUser;
    if (type === "Patient") {
      newUser = new Patient({ email, passwordHash: hashedPassword });
    } else if (type === "Doctor") {
      newUser = new Doctor({ email, passwordHash: hashedPassword });
    }else{
      return res.status(400).json({ error: "Invalid user type" });
    }

    // Save the new user and generate JWT token
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);  // Handle token generation errors in that function

    return res.status(201).json({ _id: newUser._id, type: type });

  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { type, email, password } = req.body;

    // Validate input
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

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with user ID
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
