import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookies.js";
import ErrorHandler from "../middlewares/Error.js";

export const userRegister = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10); // we always need to provide the security level to the hased password
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists", 400));
    user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User Not Found", 400));
    const isMatch = await bcrypt.compare(password, user.password); // here we already have the hashed password in the database os we compare thems
    if (!isMatch) return next(new ErrorHandler("Incorrect Password", 400));
    sendCookie(user, res, "Logged In", 200);
  } catch (error) {
    next(error);
  }
};

export const userInfo = async (req, res, next) => {
  try {
    const _id  = req.user;
    const user = await User.findById(_id);
    res.status(200).json({
      success: true,
      message: "Retrieved Info",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  try {
    const  _id  = req.user;
    const user = await User.findById(_id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    user.deleteOne();
    res
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      })
      .status(200)
      
      res
      .cookie("connect.sid", "", {
        expires: new Date(Date.now()),
      })

      res.json({
        success: true,
        message: "User Deleted",
      });
  } catch (error) {
    next(error);
  }
};



export const userLogout = async (req, res, next) => {
  try {
    if(req.cookies.token)
    {
      console.log('i have both ')
    res
      .cookie("connect.sid", "", {
        expires: new Date(Date.now()),
      })

      res
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      })


    return res.status(200)
      .json({
        success: true,
        message: "Logged Out",
      });
    }

   else if( req.cookies['connect.sid'] )
    {
      console.log('i have one')
      res
      .cookie("connect.sid", "", {
        expires: new Date(Date.now()),
      })

      res.status(200).json({
        success: true,
        message: "Logged Out",
      });

    }


  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  try {
    const _id  = req.user;
    const user = await User.findById(_id);
    const { oldpassword } = req.body;
    const { newpassword } = req.body;
    if(oldpassword== newpassword) return next(new ErrorHandler(" Enter different new password", 400))
    const encryptNewpassword = await  bcrypt.hash(newpassword, 10);
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Password ", 400));
     user.password = encryptNewpassword;
    await user.save()
    res
      .status(200)
      .json({ encryptNewpassword  , success: "true", message: "Password Changed" ,user });
  } catch (error) {
    next(error);
  }
};
