import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GetPostsService} from '../../services/getposts.service';
import {Konachan, Post} from '../../types/IKonachan';
import {LightboxComponent} from '../lightbox/lightbox.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Masonry, MasonryGridItem} from 'ng-masonry-grid';
import {SearchTerms} from '../../types/SearchTerms';


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

  @ViewChild('flexGallery')
  panel: ElementRef;

  posts: Post[];
  page = 1;
  pageSize = 50;
  defaultSearchTerms: SearchTerms;

  isLoaded = false;
  isFetching: boolean;

  totalItems: number;
  private _masonry: Masonry;


  constructor(private getPosts: GetPostsService, private resolver: ComponentFactoryResolver) {
    this.defaultSearchTerms = new SearchTerms('', this.pageSize, true, false, false);
  }

  ngOnInit() {
    this.getPosts.getPosts<Konachan>(this.defaultSearchTerms, this.page)
      .subscribe((response) => {
        response.then(value => {
          this.posts = value.posts.post;
          this.totalItems = value.posts.count;
          this.isLoaded = true;
        });
      });
  }

  goToPage(page: number, searchTerms?: SearchTerms) {
    if (this.isFetching) {
      return;
    }
    if (searchTerms === undefined) {
      searchTerms = this.defaultSearchTerms;
    }

    this.isFetching = true;
    this.panel.nativeElement.scrollTop = 0;
    this.removeAllItems();

    setTimeout(() => {
      this.getPosts.getPosts<Konachan>(searchTerms, page)
        .subscribe((response) => {
          response.then(value => {
            for (let i of value.posts.post) {
              this.addItems(i);
            }
            this.pageSize = searchTerms.pageSize;
            this.totalItems = value.posts.count;
            this.page = page;
            this.isLoaded = true;
            this.isFetching = false;
            console.log('complete ' + this.page);
          });
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
