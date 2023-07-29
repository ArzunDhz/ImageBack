import ErrorHandler from "../middlewares/Error.js";
import { User } from "../models/UserSchema.js";
import { ImageSchema } from "../models/imageSchema.js";
import Replicate from "replicate";

export const generateImage = async (req, res, next) => {
try {
  
  const { imageDescription } = req.body;
  const userd = await User.findById(req.user._id);
  if (userd.token < 10)
    return next(new ErrorHandler("Out of Token", 400));

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const output = await replicate.run(
   // "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
  // "prompthero/openjourney:ad59ca21177f9e217b9075e7300cf6e14f7e5b4505b87b9689dbd866e9768969",
 /// "ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
    "stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
    {
      input: {
        prompt: imageDescription,
      },
 


    }
  );

  const updateuser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $inc: { token: -10 },
    }
  );

  const image = await ImageSchema.create({
    imageDescription,
    imageUrl: output[0],
    user: updateuser,
  });

  res.status(201).json({image,success: true, message: "Image Generated" });
} catch (error) {
   next(error)
}
};




export const getAllImage  = async(req,res ,next)=>{
    const user  = req.user._id
    const image = await ImageSchema.find({user})
    if(!image) return next( new ErrorHandler("Not found",404))
    res.status(200).json({
        success:true,
        message:"Successfully Feteched all Image from particular user",
        image
    })
}

export const deleteImage  = async(req,res ,next)=>{
  try {
    const {deleteimage} = req.params
    const image = await ImageSchema.findById(deleteimage);
    if(!image) return next( new ErrorHandler("Not found",404))
  image.deleteOne()
    res.status(200).json({
        success:true,
        message:"Deleted",
    })

  } catch (error) {
      next(new ErrorHandler("Invalid ", 400));
  }
}


export const  deleteAllImage  = async(req,res ,next)=>{
  try {
    const user  = req.user._id
    const image = await ImageSchema.find({user})
    if(!image) return next( new ErrorHandler("Not found",404))
    res.status(200).json({
        success:true,
        message:"History Cleared",
        image
    })

  } catch (error) {
      next(error);
  }
}




