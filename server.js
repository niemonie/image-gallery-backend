const dotenv = require("dotenv");
dotenv.config();

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3300;

var cors = require("cors");

app.use(cors());
bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/imageController");
routes(app);

app.listen(port);

console.log("image gallery api started on port: " + port);
