import passport from "passport";
import JwtStrategy from "passport-jwt";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") }); //.env src디렉토리에서 실행

const jwtOption = {
    //토큰을 입력받아서 정보를 해석
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET,
};

const verifyUser = (payload, done) => {}; //해석된 정보를 콜백 함수로 전달, done-> 사용자를 찾았을 때 호출하는함수

passport.use(new JwtStrategy(jwtOption, verifyUser));
