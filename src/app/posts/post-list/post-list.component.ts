import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPost();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((post: Post[]) => {
        this.posts = post;
      });
  }
  ngOnDestroy() {
    {
      this.postSub.unsubscribe();
    }
  }
}
