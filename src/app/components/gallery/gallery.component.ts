import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BoardApiService} from '../../services/board-api.service';
import {Konachan, Post} from '../../types/Konachan';
import {LightboxComponent} from '../lightbox/lightbox.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Masonry, MasonryGridItem} from 'ng-masonry-grid';
import {SearchTerms} from '../../types/SearchTerms';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {IMessage} from '../../interfaces/IMessage';
import {GalleryProps} from '../../types/GalleryProps';


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
  galleryProps: GalleryProps;
  searchTerms: SearchTerms;
  //////////////////////////////////////////////
  // TODO: Migrate state management to Redux?

  // Masonry grid display for posts
  private _masonry: Masonry;

  // Error Message variable
  errorMessage: IMessage;


  // Create a reference to the BoardApiService
  // Initializes default SearchTerms object
  // TODO: Load the previous session's search terms
  constructor(private apiService: BoardApiService) {
    this.galleryProps = new GalleryProps([], 1, 50, false, false);
    this.searchTerms = new SearchTerms('', this.galleryProps.getPageSize, true, false, false);
  }

  // Load default posts
  // TODO: Might be better to leave it blank on first launch and display a message
  ngOnInit() {
    this.goToPage(this.galleryProps.getPage);
  }

  goToPage(page: number, searchTerms = this.searchTerms) {

    // If the request has not completed then return
    if (this.galleryProps.getIsFetching) {
      return;
    }

    // Make sure the searchTerms are consistent
    if (searchTerms !== this.searchTerms) {
      this.searchTerms = searchTerms;
    }

    // Make sure all state variable are in their proper state before fetching new posts
    this.galleryProps.hideGallery(true);
    this.panel.nativeElement.scrollTop = 0;

    // Remove all previous items from the masonry grid
    this.removeAllItems();
    // TODO: Need to make the returned type depend on what image board is selected
    this.apiService.getPosts<Konachan>(searchTerms, page).then(
      response => {
        console.log(response);

        // If there are no posts matching a query the api doesn't return an empty response
        // So I need to handle when the posts count is 0
        if (Number(response.posts.count) === 0) {
          this.galleryProps.galleryErrored();
          this.errorMessage = {
            messageTitle: 'Could not find any results',
            messageContent: 'Seems there are no images with those tags'
          };
          return;
        }

        // Adding items to the masonry grid
        // Put it in a Timeout to make sure animations do not clash
        setTimeout(() => {
          this.galleryProps.setPageSize = searchTerms.pageSize;
          this.galleryProps.setTotalItems = response.posts.count;
          this.galleryProps.setPage = page;

          this.addItems(response.posts.post);

          this.galleryProps.displayGallery();
          console.log('State Variables');
          console.log(this.galleryProps);
        }, 600);

      }, (error: Response) => {
        // Error Handling
        // TODO: Need to implement error handling for other common scenarios
        if (error.status === 0) {
          this.removeAllItems();
          setTimeout(() => {
              this.galleryProps.galleryErrored();
              this.errorMessage = {
                messageTitle: 'No Internet Connection.',
                messageContent: 'You can retry by clicking the search button.'
              };
            }, 600
          );
        }
      });
  }

  // When the Masonry grid finishes init
  // assign the events value to the _masonry variable
  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  // Removes all items from the masonry grid
  // TODO: Make the masonry grid have responsive sizes
  // TODO: Throws and error when there is no internet. Needs to fail gracefully
  removeAllItems() {
    console.log(this._masonry);
    if (this._masonry) {
      console.log(this._masonry);
      this._masonry.removeAllItems()
        .subscribe((items: MasonryGridItem) => {
          this.galleryProps.setIsLoaded = false;
          this.galleryProps.posts = [];
        });
    }
  }

  // Adds items to the masonry grid
  addItems(items) {
    if (!items) {
      this._masonry.setAddStatus('add');
      this.galleryProps.posts = [];
    }
    if (this._masonry) {
      this._masonry.setAddStatus('add');
      this.galleryProps.posts = items;
    }
  }

  // Set the lightbox posts variable so that it is only set when a lightbox is created
  // Instead of having each gallery-image component contain its own copy of posts
  setLightboxVariables(event: ComponentRef<LightboxComponent>) {
    event.instance.posts = this.galleryProps.posts;
    event.instance.tagClicked.subscribe( tag => {
      this.goToPage(1,
        new SearchTerms(
          tag,
          this.searchTerms.pageSize,
          this.searchTerms.isSafe,
          this.searchTerms.isQuestionable,
          this.searchTerms.isExplicit));
    });
  }
}
