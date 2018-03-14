import {Component, OnInit} from '@angular/core';
import {GetPostsService} from '../../services/getposts.service';
import {Konachan, Post} from '../../types/IKonachan';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  xml: Post[];
  page = 1;
  pageSize = 50;
  tags = '';
  rating = 'rating:s';


  totalItems: number;


  constructor(private getPosts: GetPostsService) {
  }

  ngOnInit() {
    this.getPosts.getPosts<Konachan>(this.pageSize, this.page, this.tags, this.rating)
      .subscribe((response) => {
        this.xml = response.posts.post;
        this.totalItems = response.posts.count;
      });

  }

  goToPage(page: number) {
    this.getPosts.getPosts<Konachan>(this.pageSize, page, this.tags, this.rating)
      .subscribe((response) => {
        this.xml = response.posts.post;
        this.page = page;
      });
  }
}
