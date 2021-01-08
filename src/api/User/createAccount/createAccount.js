import { prisma } from "../../../../generated/prisma-client";
//회원가입
export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            const check = await prisma.$exists.user({
                OR: [{ username: username }, { email: email }],
            });
            if (check == true) {
                return false;
            } else {
                await prisma.createUser({
                    username: username,
                    email,
                    firstName,
                    lastName,
                    bio,
                });
                return true;
            }
        },
    },
};
