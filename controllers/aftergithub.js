
import session from 'express-session'
import passport from '../middlewares/GithubAuth.js'
import { app } from '../app.js'
import { isUserAuthnecated } from '../middlewares/Auth.js'
import { sendGoogleData } from './googleController.js'


export const getGithub = ()=>{

       
       app.use(session({
           secret:'cat',
           resave:false,
           saveUninitialized:true,
           cookie:{ secure:false}
       }))
    
    app.use(passport.initialize())
    app.use(passport.session())
    
    
       app.get('/auth/github',
       passport.authenticate('github', { scope: ['email','profile'] }));
     
       app.get('/auth/github/callback', 
       passport.authenticate('github',
      { 
         successRedirect: 'http://localhost:5173/home',
         failureRedirect: '/auth/github/failure'
      }));
     
     
      app.get("/auth/logindata",isUserAuthnecated ,sendGoogleData);
}