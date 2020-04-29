import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileSocialComponent } from './my-profile-social.component';

describe('MyProfileSocialComponent', () => {
  let component: MyProfileSocialComponent;
  let fixture: ComponentFixture<MyProfileSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
