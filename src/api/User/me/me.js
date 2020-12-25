import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            //prisma 에선 강한 관계를 제공하지 않는다, 관계의 내용을 확인할라고 하면 추가작업
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                userProfile,
                posts,
            };
        },
    },
};
