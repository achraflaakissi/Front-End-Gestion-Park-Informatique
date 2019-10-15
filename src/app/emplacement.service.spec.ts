import { TestBed, inject } from '@angular/core/testing';

import { EmplacementService } from './emplacement.service';

describe('EmplacementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmplacementService]
    });
  });

  it('should be created', inject([EmplacementService], (service: EmplacementService) => {
    expect(service).toBeTruthy();
  }));
});
