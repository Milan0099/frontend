import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdCategoryComponent } from './submit-ad-category.component';

describe('SubmitAdCategoryComponent', () => {
  let component: SubmitAdCategoryComponent;
  let fixture: ComponentFixture<SubmitAdCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
