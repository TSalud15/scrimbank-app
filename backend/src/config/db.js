import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("failed to connect to db: ", error);
    }
};

export default connectDB;
