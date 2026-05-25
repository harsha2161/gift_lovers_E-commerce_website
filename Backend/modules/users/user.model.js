import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    firstName: { 
        type: String,
        required: true 
    },
    lastName: { 
        type: String,
        required: true 
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // only add user or admin only
        default: 'user' 
    },
    img:{
        type : String,
        required : true,
        default : "https://www.pinterest.com/pin/735634920368025450/"
    },
    isBlock:{
        type : Boolean,
        required: true,
        default : false,
    }
}, { timestamps: true }) // auto saved to databse user created time and date

const user = mongoose.model("User", userSchema)

export default user; 
