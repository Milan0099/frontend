import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdFinalComponent } from './submit-ad-final.component';

describe('SubmitAdFinalComponent', () => {
  let component: SubmitAdFinalComponent;
  let fixture: ComponentFixture<SubmitAdFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
