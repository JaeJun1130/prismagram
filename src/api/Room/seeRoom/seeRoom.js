import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Query: {
        seeRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;

            const canSee = await prisma.$exists.room({ participants_some: { id: user.id } });
            console.log(canSee);
            if (canSee) {
                return await prisma.room({ id: id }).$fragment(ROOM_FRAGMENT);
            } else {
                throw Error("you cna't see this");
            }
        },
    },
};
