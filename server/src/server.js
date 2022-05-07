const express = require("express");
require("./configs/database");
const Application = require("./models/application");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/applications/", (req, res) => {
  let query = null;
  const ids = JSON.parse(req.query.id);
  if (Array.isArray(ids)) {
    query = Application.where("_id").in(ids);
  } else {
    query = Application.where({ _id: ids });
  }

  query.then((app) => {
    res.send(app);
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
