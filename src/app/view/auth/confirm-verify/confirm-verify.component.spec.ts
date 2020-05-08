import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVerifyComponent } from './confirm-verify.component';

describe('ConfirmVerifyComponent', () => {
  let component: ConfirmVerifyComponent;
  let fixture: ComponentFixture<ConfirmVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
