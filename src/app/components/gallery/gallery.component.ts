import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GetPostsService} from '../../services/getposts.service';
import {Konachan, Post} from '../../types/IKonachan';
import {LightboxComponent} from '../lightbox/lightbox.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Masonry, MasonryGridItem} from 'ng-masonry-grid';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('animateImages', [
      state('void', style({opacity: 0})),
      transition('* <=> *', [
        animate('250ms ease-in')
      ])
    ])]

})
export class GalleryComponent implements OnInit {
  @ViewChild('galleryContainer', {read: ViewContainerRef})
  container;

  posts: Post[];
  page = 1;
  pageSize = 50;
  tags = '';
  rating = 'rating:s';

  isLoaded = false;


  totalItems: number;
  private _masonry: Masonry;


  constructor(private getPosts: GetPostsService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.getPosts.getPosts<Konachan>(this.pageSize, this.page, this.tags, this.rating)
      .subscribe((response) => {
        this.posts = response.posts.post;
        this.totalItems = response.posts.count;
        this.isLoaded = true;
      });

  }

  goToPage(page: number) {
    this.removeAllItems();
    setTimeout(() => {
      this.getPosts.getPosts<Konachan>(this.pageSize, page, this.tags, this.rating)
      .subscribe((response) => {
        for (let i of response.posts.post) {
          this.addItems(i);
        }
        this.page = page;
        this.isLoaded = true;
      });
    }, 500);

  }



  createLightbox(fileUrl: string, tags: string) {
    this.container.clear();
    const factory: ComponentFactory<LightboxComponent> = this.resolver.resolveComponentFactory(LightboxComponent);
    const component: ComponentRef<LightboxComponent> = this.container.createComponent(factory);
    component.instance.fileUrl = fileUrl;
    component.instance.tags = tags.split(' ');
    component.instance.destroyCheck
      .subscribe(v => {
        if (v === 'kill me') {
          component.destroy();
        }
      });
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  removeAllItems() {
    if (this._masonry) {
      if (this._masonry) {
        this._masonry.removeAllItems()
          .subscribe((items: MasonryGridItem) => {
            this.isLoaded = false;
            this.posts = [];
          });
      }
    }
  }

  addItems(item) {
    if (this._masonry) {
      this._masonry.setAddStatus('add');
      this.posts.push(item);
    }
  }

}
