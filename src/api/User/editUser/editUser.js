import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { username, email, firstName, lastName, bio } = args;
            const { user } = request;
            const UserCheck = await prisma.updateUser({
                where: { id: user.id },
                data: { username: username, email: email, firstName: firstName, lastName: lastName, bio: bio },
            });
            return UserCheck;
        },
    },
};
