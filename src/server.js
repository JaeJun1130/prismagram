import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") }); //.env src디렉토리에서 실행

import { GraphQLServer } from "graphql-yoga"; //graphql server
import logger from "morgan"; // 미들웨어
import schema from "./schema";

// sendSecretMail("wjswowns1234@naver.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev")); //요청로그

server.start({ port: PORT }, () => console.log(`✅ Server Running on http://localhost:${PORT}✅`));
