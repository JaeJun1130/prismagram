import { prisma } from "../../../../generated/prisma-client";
//회원가입
export default {
    Mutation: {
        createAccount: async (_, args_) => {
            const { username, email, fistName = "", lastName = "", bio = "" } = args;
            const user = await prisma.createUser({ username: username, email, fistName, lastName, bio });
            return user;
        },
    },
};
