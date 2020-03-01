import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  private post: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(response => {
          return response.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(postData => {
        this.post = postData;
        this.postsUpdate.next([...this.post]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(response => {
        console.log(response);
        this.post.push(post);
        this.postsUpdate.next([...this.post]);
      });
  }
}
