import { TestBed, inject } from '@angular/core/testing';

import { ChatgroupNonHttpService } from './chatgroup-non-http.service';

describe('ChatgroupNonHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatgroupNonHttpService]
    });
  });

  it('should be created', inject([ChatgroupNonHttpService], (service: ChatgroupNonHttpService) => {
    expect(service).toBeTruthy();
  }));
});
