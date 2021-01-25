import { TestBed } from '@angular/core/testing';

import { TitleBlinkerService } from './title-blinker.service';

describe('TitleBlinkerService', () => {
  let service: TitleBlinkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleBlinkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
