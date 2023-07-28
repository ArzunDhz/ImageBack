import  jwt from 'jsonwebtoken'

export const isUserAuthnecated = (req,res,next)=>{

    const {token} = req.cookies;
    if(!token) return res.status(400).json("Unauthorized access")
    const decodedId  = jwt.verify(token, process.env.JWT_SECRET) //here we  can decode the the id that was sign in jwt while sending cookies
    req.user = decodedId
    next()
}