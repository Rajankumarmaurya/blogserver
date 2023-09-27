import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async()=>{
   try {
     const conn =  await mongoose.connect("mongodb+srv://rajanmaurya0102:gyr5CXMXtlkRFDx6@database.0qoiabx.mongodb.net/Notebook");
    console.log("connected successfully")
   } catch (error) {
    console.log(error)
   }
    
}
export default connectDB;