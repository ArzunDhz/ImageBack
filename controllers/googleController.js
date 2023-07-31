import ErrorHandler from "../middlewares/Error.js"
import { User } from "../models/UserSchema.js"


export const  sendGoogleData =  async(req, res) => {

    const user = await User.findById(req.user)
    if(!user) return next(ErrorHandler("Not authorized yo yo",400)) 
    res.json(user)
  }

