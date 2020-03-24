"use strict";
module.exports = function (app) {
  var image = require("../controllers/imageController");

  app.route("/images").get(image.list_all_images);
};
