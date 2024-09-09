import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to db");
    } catch (error) {
        console.log("Error connecting to db", error);
    }
}

export default connectToMongoDB;