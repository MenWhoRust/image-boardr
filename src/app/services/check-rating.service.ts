import { Injectable } from '@angular/core';

@Injectable()
export class CheckRatingService {

  constructor() { }

  checkRating(isSafe, isQuestionable, isExplicit) {
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
