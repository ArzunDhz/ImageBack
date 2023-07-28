
import jwt from 'jsonwebtoken'
//here we need to create the jwt from the any attribute present from the user, we use user id for making cookies 

export const sendCookie = (user,res,message,statuscode=200) =>{
    
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    res.cookie('token',token,{ 
        maxAge: new Date(Date.now()+900000),
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    }).status(statuscode).json({
        success:true,
        message:message,
        user
    })
}



export const sendgoogleCookie = (googleuser,res,message,statuscode=200) =>{
    console.log(googleuser._id)
    const token = jwt.sign({_id:googleuser._id}, process.env.JWT_SECRET)
    console.log(googleuser.username)
    res.cookie('token',token,{ 
        maxAge: new Date(Date.now()+900000),
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    }).status(statuscode).json({
        success:true,
        message:message,
        googleuser
    })
}
