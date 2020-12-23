import { secretGenerator, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async (_, args, { request }) => {
            console.log(request);
            const { email } = args;
            const loginSecret = secretGenerator(); // resolver => utils => word => update
            console.log(loginSecret);
            try {
                throw Error();
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({ data: { loginSecret: loginSecret }, where: { email } }); //해당 이메일에 로그인시크릿 값을 넣어줌
                return true;
            } catch {
                return false;
            }
        },
    },
};
