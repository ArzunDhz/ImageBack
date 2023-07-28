import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:Number,
        default:150,
        require:true
    }
});



  export const User = mongoose.model('UserInfo', userSchema)