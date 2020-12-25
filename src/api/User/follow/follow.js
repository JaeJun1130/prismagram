import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        follow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            try {
                await prisma.updateUser({ where: { id: user.id }, data: { following: { connect: { id: id } } } });
                return true;
            } catch {
                return false;
            }
        },
    },
};

// 위 {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNraXZ1ejdhZTdiaDUwYTI2ejVmbXI5YzciLCJpYXQiOjE2MDg3OTcxMTJ9.G5c-KxnlxHEcJc21Y40Meg_KD_VxaLP_rQLtj-HeVcE"}
// 아래 {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNraXp3Nm43d3NmeTcwOTk5bndyMnhyc3IiLCJpYXQiOjE2MDg3MDA0NjR9.vEXjXop1zCBLqHdqAucPKUk6w2HZdrfBxNimQBZpGBE"}
