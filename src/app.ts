const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
require('./utils/prom-server');

// Create express app
const app = express();
app.use(cors());
app.set('port', 3000);

// Mongo
mongoose.connect("mongodb://localhost:27017/facebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to mongodb database");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("Hello world!");
});

const PostsRoute = require("./routes/Posts");
app.use("/posts", PostsRoute);
const UsersRoute = require("./routes/Users");
app.use("/user", UsersRoute);

// Start server
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
