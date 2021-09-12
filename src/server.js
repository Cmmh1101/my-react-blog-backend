import express from "express";
import bodyParser from "body-parser";

const app = express();

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

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

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;

  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`
    );
});

app.listen(8000, () => console.log("listening on port 8000"));
