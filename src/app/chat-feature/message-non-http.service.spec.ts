import { TestBed, inject } from '@angular/core/testing';

import { MessageNonHttpService } from './message-non-http.service';

describe('MessageNonHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageNonHttpService]
    });
  });

  it('should be created', inject([MessageNonHttpService], (service: MessageNonHttpService) => {
    expect(service).toBeTruthy();
  }));
});
