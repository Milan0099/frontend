import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdTermsComponent } from './submit-ad-terms.component';

describe('SubmitAdTermsComponent', () => {
  let component: SubmitAdTermsComponent;
  let fixture: ComponentFixture<SubmitAdTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
