import {KonachanPost} from './Konachan';

export class GalleryProps {
  constructor(public posts: KonachanPost[],
              private page: number,
              private pageSize: number,
              private isLoaded: boolean,
              private isFetching: boolean,
              private totalItems: number = null,
              private isInErrorState: boolean = null) {

  }
  get getPage() {
    return this.page;
  }

  set setPage(page: number) {
    this.page = page;
  }
  get getPageSize() {
    return this.pageSize;
  }

  set setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  get getTotalItems() {
    return this.totalItems;
  }

  set setTotalItems(totalItems: number) {
    this.totalItems = totalItems;
  }

  get getIsLoaded() {
    return this.isLoaded;
  }

  set setIsLoaded(isLoaded: boolean) {
    this.isLoaded = isLoaded;
  }

  get getIsFetching() {
    return this.isFetching;
  }

  set setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  get getIsInErrorState() {
    return this.isInErrorState;
  }

  set setIsInErrorState(isInErrorState: boolean) {
    this.isInErrorState = isInErrorState;
  }

  hideGallery(isNewGallery: boolean) {
    this.isLoaded = false;
    this.isFetching = true;
    if (isNewGallery) {
      this.isInErrorState = false;
    }
  }

  displayGallery() {
    this.isLoaded = true;
    this.isFetching = false;
  }

  galleryErrored() {
    this.isInErrorState = true;
    this.displayGallery();
  }


}
