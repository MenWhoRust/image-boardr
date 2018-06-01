import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GetPostsService} from '../../services/getposts.service';
import {Konachan, Post} from '../../types/Konachan';
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
  // Get a reference to the gallery container
  @ViewChild('galleryContainer', {read: ViewContainerRef})
  container: ViewContainerRef;

  // Reference to the flexGallery element
  @ViewChild('flexGallery')
  panel: ElementRef;

  // Holds information about the current posts, page, page size,
  // total items and search terms
  ///////////////////////////////////////////////
  posts: Post[] = [];
  page = 1;
  pageSize = 50;
  searchTerms: SearchTerms;
  totalItems: number;
  //////////////////////////////////////////////

  // Application State variables
  // TODO: Migrate state management to Redux?
  /////////////////////////
  isLoaded = false;
  isFetching: boolean;
  isInErrorState = false;
  ////////////////////////

  // Masonry grid display for posts
  private _masonry: Masonry;

  // Error Message variable
  errorMessage: IErrorMessage;


  // Create a reference to the GetPostsService
  // Initializes default SearchTerms object
  // TODO: Load the previous session's search terms
  constructor(private getPosts: GetPostsService) {
    this.searchTerms = new SearchTerms('', this.pageSize, true, false, false);
  }

  // Load default posts
  // TODO: Might be better to leave it blank on first launch and display a message
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
    // TODO: Need to make the returned type depend on what image board is selected
    this.getPosts.getPosts<Konachan>(this.searchTerms, page).then(
      response => {
        console.log(response);

        // If there are no posts matching a query the api doesn't return an empty response
        // So I need to handle when the posts count is 0
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

        // Adding items to the masonry grid
        // Put it in a Timeout to make sure animations do not clash
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
        // Error Handling
        // TODO: Need to implement error handling for other common scenarios
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

  // Sends a request will the search terms received from
  // the search bar component
  setSearchTerms(searchTerms: SearchTerms) {
    this.searchTerms = searchTerms;
    this.goToPage(1);
  }

  // When the Masonry grid finishes init
  // assign the events value to the _masonry variable
  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  // Removes all items from the masonry grid
  removeAllItems() {
    if (this._masonry) {
      this._masonry.removeAllItems()
        .subscribe((items: MasonryGridItem) => {
          // TODO: See what is in items
          this.isLoaded = false;
          this.posts = [];
        });
    }
  }

  // Adds items to the masonry grid
  addItems(items) {
    if (this._masonry) {
      this._masonry.setAddStatus('add');
      this.posts = items;
    }
  }
}
