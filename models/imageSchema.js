import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const imageSchema = new mongoose.Schema({
     
    imageDescription:{
            type:String,
            require:true
    },
     imageUrl:{
        type:String,
        require:true
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo',
        required:true
    },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
});

//Export the model
export const ImageSchema = mongoose.model('Image', imageSchema)