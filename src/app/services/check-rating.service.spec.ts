import { TestBed, inject } from '@angular/core/testing';

import { CheckRatingService } from './check-rating.service';

describe('CheckRatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckRatingService]
    });
  });

  it('should be created', inject([CheckRatingService], (service: CheckRatingService) => {
    expect(service).toBeTruthy();
  }));
});
