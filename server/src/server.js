require("./configs/database");
const express = require("express");
const cors = require("cors");
const Application = require("./models/application");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static("assets/apps"));

app.get("/applications/", (req, res) => {
  let query = null;

  const ids = req.query.id;
  if (ids.includes(",")) {
    query = Application.where("_id").in(ids.split(","));
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
