import mongoose from "mongoose"

export default async function connectDB() {
    try{
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB Connected")
    }catch(error){
        console.error("Database Connection error",error)
        process.exit(1)
    }
    
}