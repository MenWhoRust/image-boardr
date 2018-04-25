import {CheckRatingService} from '../services/check-rating.service';

export class SearchTerms {
  rating: string;
  constructor(private _tags: string, private _pageSize: number, private _isSafe: boolean, private _isQuestionable: boolean, private _isExplicit: boolean ) {
    const ratingService = new CheckRatingService();
    this.rating = ratingService.checkRating(this._isSafe, this._isQuestionable, this._isExplicit);
  }
  get tags() {
    return this._tags;
  }
  get pageSize() {
    return this._pageSize;
  }
  get getRatingString() {
    return this.rating;
  }
  get isSafe() {
    return this._isSafe;
  }
  get isQuestionable() {
    return this._isQuestionable;
  }
  get isExplicit() {
    return this._isExplicit;
  }
}

