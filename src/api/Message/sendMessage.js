import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragment";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            //방이 존재하지 않을때
            if (roomId === undefined) {
                if (user.id !== toId) {
                    room = await prisma
                        .createRoom({
                            participants: { connect: [{ id: toId }, { id: user.id }] }, //메시지 받는사람과, 보내는사람
                        })
                        .$fragment(ROOM_FRAGMENT);
                }
                //방이존재할때
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("Room not found");
            }
            const getTo = room.participants.filter((participant) => participant.id !== user.id)[0];
            const sendMessage = await prisma.createMessage({
                text: message,
                from: { connect: { id: user.id } },
                to: { connect: { id: roomId ? getTo.id : toId } },
                room: { connect: { id: room.id } },
            });
            return sendMessage;
        },
    },
};
