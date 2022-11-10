import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAPIComponent } from './openapi.component';

describe('OpenAPIComponent', () => {
  let component: OpenAPIComponent;
  let fixture: ComponentFixture<OpenAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenAPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
