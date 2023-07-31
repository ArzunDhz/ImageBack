import  jwt from 'jsonwebtoken'
import { User } from '../models/UserSchema.js';

export const isUserAuthnecated = (req,res,next)=>{


  //logged in by the google


  if( req.cookies.token ) 
  {
    const {token} = req.cookies
    if(!token) return res.status(400).json("Unauthorized access")
    const decodedId  = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = decodedId._id
     return next()

  }
  if( req.cookies['connect.sid'])
  {
    req.user =  req.session.passport.user._id;
    return next()

  }
}


