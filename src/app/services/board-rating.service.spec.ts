import { TestBed, inject } from '@angular/core/testing';

import { BoardRatingService } from './board-rating.service';

describe('BoardRatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardRatingService]
    });
  });

  it('should be created', inject([BoardRatingService], (service: BoardRatingService) => {
    expect(service).toBeTruthy();
  }));
});
