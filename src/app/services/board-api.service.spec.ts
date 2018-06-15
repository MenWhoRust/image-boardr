import {TestBed, inject} from '@angular/core/testing';

import {BoardApiService} from './board-api.service';

describe('BoardApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardApiService]
    });
  });

  it('should be created', inject([BoardApiService], (service: BoardApiService) => {
    expect(service).toBeTruthy();
  }));
});
