import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapConnectionComponent } from './sap-connection.component';

describe('SapConnectionComponent', () => {
  let component: SapConnectionComponent;
  let fixture: ComponentFixture<SapConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
