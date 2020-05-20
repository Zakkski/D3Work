import { Component, OnInit } from "@angular/core";
const express = require("express");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-file-update";
  app: any;
  port = 3000;
  constructor() {
    this.app = express();
  }

  ngOnInit() {
    this.app.get("/api/upload", (req, res) => {
      res.json({
        message: "hello",
      });
    });
    this.app.listen(this.port, () =>
      console.log(`Example app listening on port ${this.port}!`)
    );
  }
}
