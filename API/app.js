import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = parseInt(process.env.PORT, 10) || 1440;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("*", (req, res) =>
  res.send({
    message: "It all start from localhost"
  })
);

app.listen(port, () => console.log(`Server running on port ${port}`));
