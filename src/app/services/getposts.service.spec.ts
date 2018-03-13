import {TestBed, inject} from '@angular/core/testing';

import {GetPostsService} from './getposts.service';

describe('GetPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPostsService]
    });
  });

  it('should be created', inject([GetPostsService], (service: GetPostsService) => {
    expect(service).toBeTruthy();
  }));
});
