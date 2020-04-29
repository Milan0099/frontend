import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileBasicComponent } from './my-profile-basic.component';

describe('MyProfileBasicComponent', () => {
  let component: MyProfileBasicComponent;
  let fixture: ComponentFixture<MyProfileBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
