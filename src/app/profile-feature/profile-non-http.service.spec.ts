import { TestBed } from '@angular/core/testing';

import { ProfileNonHttpService } from './profile-non-http.service';

describe('ProfileNonHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileNonHttpService = TestBed.get(ProfileNonHttpService);
    expect(service).toBeTruthy();
  });
});
