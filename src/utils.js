import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") }); //.env src디렉토리에서 실행

import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

import { wordObject, aa } from "./word";

export const secretGenerator = () => {
    //랜덤의 값을 섞어줌
    const rendomNumber = Math.floor(Math.random() * wordObject.length);
    return `${wordObject[rendomNumber]}  ${aa[rendomNumber]}`;
};

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
