const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
  {
    authSource: "admin",
  }
);
mongoose.Promise = global.Promise;
