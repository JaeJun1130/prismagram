require("dotenv").config(); //.env 외부환경변수사용 process.env.~ 으로 접근
import { GraphQLServer } from "graphql-yoga"; //graphql server
import logger from "morgan"; // 미들웨어
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev")); //요청로그

server.start({ port: PORT }, () => console.log(`✅ Server Running on http://localhost:${PORT}✅`));
