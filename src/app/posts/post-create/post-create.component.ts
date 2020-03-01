import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  constructor(public postService: PostService) {}

  onPostSuibmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postService.addPost(form.value.postTitle, form.value.postComment);
    form.resetForm();
  }
}
