import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdMediaComponent } from './submit-ad-media.component';

describe('SubmitAdMediaComponent', () => {
  let component: SubmitAdMediaComponent;
  let fixture: ComponentFixture<SubmitAdMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
