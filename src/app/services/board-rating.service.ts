import { Injectable } from '@angular/core';

@Injectable()
export class BoardRatingService {

  constructor() { }

  // Checks the rating bools passed to it and returns a suitable tag
  checkKonachanRating(isSafe, isQuestionable, isExplicit) {
    if (isSafe && !isQuestionable && !isExplicit) {
      return 'rating:s';
    }

    if (!isSafe && isQuestionable && !isExplicit) {
      return 'rating:q';
    }

    if (!isSafe && !isQuestionable && isExplicit) {
      return 'rating:e';
    }

    if (isSafe && isQuestionable && !isExplicit) {
      return '-rating:e';
    }

    if (isSafe && !isQuestionable && isExplicit) {
      return '-rating:q';
    }

    if (!isSafe && isQuestionable && isExplicit) {
      return '-rating:s';
    }

    return '';
  }

}
