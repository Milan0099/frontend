import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdBasicComponent } from './submit-ad-basic.component';

describe('SubmitAdBasicComponent', () => {
  let component: SubmitAdBasicComponent;
  let fixture: ComponentFixture<SubmitAdBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
