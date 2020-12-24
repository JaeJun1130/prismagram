import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
// 사진 Like/unLike
export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request); // request 의 담겨진 유저정보 체크
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [{ user: { id: user.id } }, { post: { id: postId } }],
            };
            try {
                // 좋아요한 유저 아이디랑 / 로그인한 유저 아이디가 같은지 확인 체크
                // 좋아요한 게시물 1번 , 내가 좋아요한 게시물 1번이랑 같은지 체크
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike) {
                    //true -> unLike
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    //false -> like
                    //좋아요한 유저 아이디랑 (커넥) 로그인한 유저 아이디
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                        //좋아요한 게시물 (커넥) 내가 좋아요한 포스트
                        post: {
                            connect: {
                                id: postId,
                            },
                        },
                    });
                }
                return true;
            } catch {
                return false;
            }
        },
    },
};
