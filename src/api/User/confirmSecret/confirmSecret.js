import { generateToken } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

//입력한 비밀키랑 db에있는 비밀키랑 같은지 체크
export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email, secret } = args;
            const user = await prisma.user({ email: email });
            if (user.loginSecret === secret) {
                await prisma.updateUser({ where: { id: user.id }, data: { loginSecret: "" } });
                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret conviation");
            }
        },
    },
};
