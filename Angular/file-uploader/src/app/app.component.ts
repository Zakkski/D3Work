import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  uploadedFiles: Array<File>;
  title = "file-uploader";

  constructor(private http: HttpClient) {}

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    const formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads[]",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http.post("/api/upload", formData).subscribe((response) => {
      console.log("response received is ", response);
    });
  }
}
