import { makeExecutableSchema } from "graphql-tools";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

import path from "path";

const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql")); //api 있는 모든 폴더/파일 .graphql 찾기
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js")); //api 있는 모든 폴더/파일 .js찾기

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(allTypes),
    resolvers: mergeResolvers(allResolvers),
});

export default schema;
