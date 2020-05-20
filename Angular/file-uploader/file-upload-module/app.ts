const express = require("express");
const app = express();
const port = 3000;
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./uploads" });
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/upload", multipartMiddleware, (req, res) => {
  res.json({
    message: "uploaded successfully",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
