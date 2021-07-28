require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import upload from './multer';


const PORT = process.env.PORT;

const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
    },
});

const app = express();

// app.use(function (req, res, next) {
//   console.log('\n\nreq!:\n', Object.keys(req.rawHeaders));
//   // console.log('\n\nres:\n', res);
//   next();
// });
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', upload.array('photos'), (req, res, next) => {
  // console.log(Object.keys(req));
  // console.log(req.files)
  // console.log(req.body.operations);
  // console.log(JSON.parse(req.body.operations).query);

  res.send(req.files);
})

// app.get('/red', (req, res, next) => {
//   console.log(req.body);
// })

// app.post('/graphql', (req,res,next) => {
//   // console.log("post!");
//   // console.log(req);
//   next();
// })



app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
