import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import User from '../DB/Schemas/UserSchema.js'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

passport.use(
    new GoogleStrategy(
        {
            // clientID:'',
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            // clientID: FACEBOOK_APP_ID,
            // clientSecret: FACEBOOK_APP_SECRET,
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/facebook/callback",
            profileFields: ["id", "displayName", "emails", "picture.type(large)"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ facebookId: profile.id });
                if (!user) {
                    user = await User.create({
                        facebookId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value || "",
                        avatar: profile.photos?.[0]?.value || "",
                    });
                }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
