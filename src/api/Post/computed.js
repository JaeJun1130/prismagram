import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        isLiked: async (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({ AND: [{ user: { id: user.id } }, { post: { id: id } }] });
        },
        likeCount: (parent) => {
            return prisma
                .likesConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count();
        },
    },
};
