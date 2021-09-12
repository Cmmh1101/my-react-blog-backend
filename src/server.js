import express from "express";
import bodyParser from "body-parser";

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
app.get("/hello", (req, res) => res.send("hello!"));

// get by name
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));

// create post route
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log("listening on port 8000"));
