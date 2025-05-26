// src/auth/passport.js
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserByEmail } from "../models/user.js"; // note the .js extension
import dotenv from "dotenv";

dotenv.config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await findUserByEmail(jwt_payload.email);
			return done(user ? null : null, user || false);
		} catch (err) {
			return done(err, false);
		}
	})
);

export default passport;
