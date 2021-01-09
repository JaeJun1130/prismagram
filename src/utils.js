import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import { wordObject, aa } from "./word";
import jwt from "jsonwebtoken";

/* 랜덤 키값 만들어줌 */
export const secretGenerator = () => {
    //랜덤의 값을 섞어줌
    const rendomNumber = Math.floor(Math.random() * wordObject.length);
    return `${wordObject[rendomNumber]} ${aa[rendomNumber]}`;
};
/*------------------*/

/** sendgrid/nodemailer 사용 */
const sendMail = (email) => {
    const option = {
        auth: {
            api_key: process.env.SENDGRID_PASSWORD,
        },
    };
    const client = nodemailer.createTransport(sgTransport(option));
    return client.sendMail(email);
};
export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "wjswowns1234@naver.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `Hello ! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
    };
    return sendMail(email);
};
/**------------------------- */

/*JWT가 id를 암호화 해서 토근 생성*/
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
/*------------*/
