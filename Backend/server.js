import app from "./app.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`service running on port ${PORT}`)
    }) 
}).catch((error)=>{
    console.error("Failed to start server before Database connection", error)
})

