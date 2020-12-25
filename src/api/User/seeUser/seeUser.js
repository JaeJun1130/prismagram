import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { id } = args;
            const userProfile = await prisma.user({ id: id });
            const posts = await prisma.user({ id: id }).posts();
            return {
                userProfile,
                posts,
            };
        },
    },
};
