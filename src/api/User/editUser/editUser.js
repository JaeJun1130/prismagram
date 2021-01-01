import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { username, email, firstName, lastName, bio, avatar } = args;
            const { user } = request;
            const UserCheck = await prisma.updateUser({
                where: { id: user.id },
                data: { username: username, email: email, firstName: firstName, lastName: lastName, bio: bio, avatar },
            });
            return UserCheck;
        },
    },
};
