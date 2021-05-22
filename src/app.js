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

const TasksRoute = require("./routes/Tasks");
app.use("/tasks", TasksRoute);
const UsersRoute = require("./routes/Users");
app.use("/user", UsersRoute);

// Start server
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
