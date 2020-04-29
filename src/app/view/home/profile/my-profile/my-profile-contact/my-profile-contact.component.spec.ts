import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileContactComponent } from './my-profile-contact.component';

describe('MyProfileContactComponent', () => {
  let component: MyProfileContactComponent;
  let fixture: ComponentFixture<MyProfileContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
