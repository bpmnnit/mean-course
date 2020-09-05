import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  newPost = 'No CONTENT';
  onAddPost() {
    this.newPost = 'The user\'s post';
  }
}
