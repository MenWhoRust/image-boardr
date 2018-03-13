import {TestBed, inject} from '@angular/core/testing';

import {XmlParserService} from './xml-parser.service';

describe('XmlParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XmlParserService]
    });
  });

  it('should be created', inject([XmlParserService], (service: XmlParserService) => {
    expect(service).toBeTruthy();
  }));
});
