import 'dotenv/config'
import passport from 'passport';
import google from 'passport-google-oauth20'
import facebook from 'passport-facebook'

const facebookStrategy = facebook.Strategy
const googleStrategy = google.Strategy

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.MAIN_URL}/auth/google/callback`
}, (__, _, profile, cb) => cb(null, profile)));

passport.use(new facebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.MAIN_URL}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'emails']
}, (__, _, profile, cb) => cb(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));