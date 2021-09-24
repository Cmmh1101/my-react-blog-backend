import express from "express";
var cors = require("cors");
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

// app.use(bodyParser); //deprecated method use the ones bellow
// app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// get route
// app.get("/hello", (req, res) => res.send("hello!"));

// get by name
// app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));

// create post route
// app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}!`));

// app.get("/articles", async (req, res) => {
//   const articleName = req.params.name;

//   const client = await MongoClient.connect("mongodb://localhost:27017", {
//     useNewParser: true,
//   });

//   const db = await mongoClient.db("myreactblogbackend");
//   const dataCollection = await db.collection("articles");

//   const db = await client.db("myreactblogserver");

//   const articleInfo = await db
//     .getCollection("articles")
//     .findOne({ name: articleName });

//   res.status(200).json(articleInfo);

//   // client.close();

//   // res.status(500).json({ message: "error connecting to db", error });
// });
app.get("/articles/:name", async (req, res) => {
  console.log("1");
  const articleName = req.params.name;

  const client = await MongoClient.connect("mongodb://localhost:27017");

  const db = await client.db("myreactblogserver");
  const dataCollection = await db.collection("articles");
  console.log("1");
  const articleInfo = await dataCollection.findOne({ name: articleName });
  console.log("2");
  res.status(200).json(articleInfo);
  console.log("3");
  // client.close();

  // res.status(500).json({ message: "error connecting to db", error });
});

// app.post("/api/articles/:name/upvote", (req, res) => {
//   const articleName = req.params.name;

//   articlesInfo[articleName].upvotes += 1;
//   res
//     .status(200)
//     .send(
//       `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`
//     );
// });

// app.post("/api/articles/:name/add-comment", (req, res) => {
//   const { username, text } = req.body;
//   const articleName = req.params.name;

//   articlesInfo[articleName].comments.push({ username, text });

//   res.status(200).send(articlesInfo[articleName]);
// });

app.listen(8000, () => console.log("listening on port 8000"));
