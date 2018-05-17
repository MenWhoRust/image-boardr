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
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {IErrorMessage} from '../../types/IErrorMessage';


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
  container: ViewContainerRef;

  @ViewChild('flexGallery')
  panel: ElementRef;

  posts: Post[] = [];
  page = 1;
  pageSize = 50;
  searchTerms: SearchTerms;

  isLoaded = false;
  isFetching: boolean;
  isInErrorState = false;

  totalItems: number;
  private _masonry: Masonry;

  errorMessage: IErrorMessage;


  constructor(private getPosts: GetPostsService) {
    this.searchTerms = new SearchTerms('', this.pageSize, true, false, false);
  }

  ngOnInit() {
    this.goToPage(this.page);
  }

  goToPage(page: number) {

    // If the request has not completed then return
    if (this.isFetching) {
      return;
    }
    // If no search terms are passed then use the component variable

    // We are fetching new posts so we set a true isLoaded to false
    this.isLoaded = false;

    // Make sure all state variable are in their proper state before fetching new posts
    this.isFetching = true;
    this.isInErrorState = false;
    this.panel.nativeElement.scrollTop = 0;

    // Remove all previous items from the masonry grid
    this.removeAllItems();
    this.getPosts.getPosts(this.searchTerms, page).then(
      response => {
        console.log(response);

        // If there are no posts matching a query the api doesn't return an empty response
        // So I needed to handle when the posts count is 0
        if (Number(response.posts.count) === 0) {
          this.isInErrorState = true;
          this.isLoaded = true;
          this.isFetching = false;
          this.errorMessage = {
            messageTitle: 'Could not find any results',
            messageContent: 'Seems there are no images with those tags'
          };
          return;
        }

        setTimeout(() => {
          this.pageSize = this.searchTerms.pageSize;
          this.totalItems = response.posts.count;
          this.page = page;

          this.addItems(response.posts.post);

          this.isLoaded = true;
          this.isFetching = false;
          console.log('State Variables');
          console.log('isLoaded: ' + this.isLoaded);
          console.log('isFetching: ' + this.isFetching);
          console.log('pageSize: ' + this.pageSize);
          console.log('page: ' + this.page);
          console.log('totalItems: ' + this.totalItems);
          console.log('posts: ' + this.posts.length);
        }, 600);

      }, (error: Response) => {
        if (error.status === 0) {
          this.removeAllItems();
          setTimeout(() => {
              this.isLoaded = true;
              this.isInErrorState = true;
              this.isFetching = false;
              this.errorMessage = {
                messageTitle: 'No Internet Connection.',
                messageContent: 'You can retry by clicking the search button.'
              };
            }, 600
          );
        }
      });
  }

  setSearchTerms(searchTerms: SearchTerms) {
    this.searchTerms = searchTerms;
    this.goToPage(1);
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  removeAllItems() {
    if (this._masonry) {
      this._masonry.removeAllItems()
        .subscribe((items: MasonryGridItem) => {
          this.isLoaded = false;
          this.posts = [];
        });
    }
  }

  addItems(items) {
    if (this._masonry) {
      this._masonry.setAddStatus('add');
      this.posts = items;
    }
  }
}
