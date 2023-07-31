const gc  = '94f6a19bf0b7ba717e99b1cc3c9130811d060ea3'
const gi = '5cd9f82a03464c7d5f79'
import { Strategy as GitHubStrategy } from "passport-github2"
import passport from "passport";
import { User } from "../models/UserSchema.js";

passport.use(new GitHubStrategy({
    clientID: gi,
    clientSecret: gc,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
      let user = await User.findOne({githubId:profile.id});
      if (user)     return  done(null, user)
      if(User.githubId != profile.id)
      {
        const newuser = {
          githubId: profile.id,
          username: profile.username,
          photo: profile.photos[0].value,
          createdfrom: "Github",
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
));



passport.serializeUser((user,done)=>{
    done(null,user )
})
passport.deserializeUser((user,done)=>{
    done(null,user )
})

export default passport