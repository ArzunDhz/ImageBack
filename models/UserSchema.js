import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    token:{
        type:Number,
        default:150,
        require:true
    },
    createdfrom:{
        type:String,
        default:'UserForm'
    },
    photo:String,
    googleId:String,
    githubId:String
});



  export const User = mongoose.model('UserInfo', userSchema)