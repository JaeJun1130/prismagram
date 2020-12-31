import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id, caption, location, action } = args;
            const { user } = request;
            const post = await prisma.$exists.post({ id: id, user: { id: user.id } });
            if (post) {
                if (action === "EDIT") {
                    return await prisma.updatePost({
                        where: { id: id },
                        data: { caption: caption, location: location },
                    });
                } else if (action === "DELETE") {
                    return await prisma.deletePost({ id: id });
                }
            } else {
                throw Error("You can't do that");
            }
        },
    },
};
