const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./uploads" });
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/api/upload", multipartMiddleware, (req, res) => {
  res.json({
    message: "Uploaded successfully",
  });
});

app.get("/api/upload", (req, res) => {
  res.json({
    message: "Switch to a put request ya dringus",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
