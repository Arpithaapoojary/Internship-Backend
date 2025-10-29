import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL,{ dbName: process.env.DB_NAME }
      // "mongodb+srv://arpithapoojary:2024mca119@cluster0.lqymip6.mongodb.net/?appName=Cluster0",
      
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Err while connecting", err));
};
export default connectDB;
