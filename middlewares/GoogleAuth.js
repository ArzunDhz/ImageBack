import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/UserSchema.js";
const gClientID ="936095275055-dplhj5u9cbfecs29h2o7eg2akf92q4n1.apps.googleusercontent.com";
const gClientSecret = "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";




passport.use(
  new GoogleStrategy(
    {
      clientID: gClientID,
      clientSecret: gClientSecret,
      callbackURL: "/auth/google/callback",
      
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({googleId:profile.id});
        if (user)     return  done(null, user)
        if(User.googleId != profile.id)
        {
          const newuser = {
            email: profile.emails[0].value,
            googleId: profile.id,
            username: profile.displayName,
            photo: profile.photos[0].value,
            createdfrom: "Google",
            token: 150,
          };
          user = await User.create(newuser);
          done(null, user);
        }
        else done(null, user);
        
      } catch (error) {
        console.log(error);
      }
    }
  )
);




passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
