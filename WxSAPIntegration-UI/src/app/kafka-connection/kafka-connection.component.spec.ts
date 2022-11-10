import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaConnectionComponent } from './kafka-connection.component';

describe('KafkaConnectionComponent', () => {
  let component: KafkaConnectionComponent;
  let fixture: ComponentFixture<KafkaConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KafkaConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
