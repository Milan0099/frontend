import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdLocationComponent } from './submit-ad-location.component';

describe('SubmitAdLocationComponent', () => {
  let component: SubmitAdLocationComponent;
  let fixture: ComponentFixture<SubmitAdLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
