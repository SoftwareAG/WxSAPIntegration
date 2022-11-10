import { TestBed } from '@angular/core/testing';

import { KafkaConnectionService } from './kafka-connection.service';

describe('KafkaConnectionService', () => {
  let service: KafkaConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
