import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { prisma } from "../generated/prisma-client";

const jwtOption = {
    //토큰을 입력받아서 정보를 해석
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰을 가져옴
    secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
    //해석된 정보를 콜백 함수로 전달, done-> 사용자를 찾았을 때 호출하는함수
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            return done(null, user); //사용자가 있으면 return
        } else {
            return done(null, false); // 없으면 false
        }
    } catch (error) {
        return done(error, false);
    }
};

export const authenticateJwt = (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);

passport.use(new Strategy(jwtOption, verifyUser));
passport.initialize();
