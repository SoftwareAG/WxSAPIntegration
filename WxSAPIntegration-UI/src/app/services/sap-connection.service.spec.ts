import { TestBed } from '@angular/core/testing';

import { SapConnectionService } from './sap-connection.service';

describe('SapConnectionService', () => {
  let service: SapConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SapConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
