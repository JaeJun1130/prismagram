import "./env";
import { GraphQLServer } from "graphql-yoga"; //graphql server
import logger from "morgan"; // 미들웨어
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

// sendSecretMail("wjswowns1234@naver.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request, isAuthenticated }),
}); //context -> resolver 사이의 정보를 공유할때 사용

server.express.use(logger("dev")); //요청로그
server.express.use(authenticateJwt);
/* 미들웨어 
1. 서버의 전달되는 모든 요청은 authenticateJwt함수를 통과한다.
2. passport.js -> authenticateJwt 함수에서는 authenticate함수를 실행
3. authenticate 함수는 strategy를 활용해 jwt 토큰을 추출
4. 토큰이 추출되면 정보를 payload와 함께 실행
5. payload 에서 해석된 id를 받아서 user에게 리턴
6. 콜백 함수가 실행되서 사용자가 있으면 그 사용자를 req에 추가
7. server에 context에 req를 담아줌
*/

server.start({ port: PORT }, () => console.log(`✅ Server Running on http://localhost:${PORT}✅`));
