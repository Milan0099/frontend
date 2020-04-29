import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePasswordComponent } from './my-profile-password.component';

describe('MyProfilePasswordComponent', () => {
  let component: MyProfilePasswordComponent;
  let fixture: ComponentFixture<MyProfilePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfilePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfilePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
