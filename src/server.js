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

// function to handle all repeated code

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = await client.db("myreactblogserver");

    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to the database" });
  }
};

app.get("/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const dataCollection = await db.collection("articles");

    const articleInfo = await dataCollection.findOne({ name: articleName });

    res.status(200).json(articleInfo);
  }, res);

  // res.status(500).json({ message: "error connecting to db", error });
});

app.post("/articles/:name/upvote", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const dataCollection = await db.collection("articles");
    const articleInfo = await dataCollection.findOne({ name: articleName });
    await dataCollection.updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updatedArticleInfo = await dataCollection.findOne({
      name: articleName,
    });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.post("/articles/:name/add-comment", async (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  withDB(async (db) => {
    const dataCollection = await db.collection("articles");
    const articleInfo = await dataCollection.findOne({ name: articleName });
    await dataCollection.updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await dataCollection.findOne({
      name: articleName,
    });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.listen(8000, () => console.log("listening on port 8000"));
