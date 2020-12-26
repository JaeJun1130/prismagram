import { prisma } from "../../../generated/prisma-client";

export default {
    //custom resolver
    //먼저는 prisma -> server
    User: {
        fullName: (parent) => {
            //parent ex)fullName 의 parent 는 user
            //seeUser에서도 돌아가는 이유는 schema.js에서 결국 합쳐짐
            return `${parent.firstName} `;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [{ id: user.id }, { followers_some: { id: parentId } }],
                });
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
    },
    Post: {
        isLiked: async (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({ AND: [{ user: { id: user.id } }, { post: { id: id } }] });
        },
    },
};
