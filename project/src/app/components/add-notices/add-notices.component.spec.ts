import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoticesComponent } from './add-notices.component';

describe('AddNoticesComponent', () => {
  let component: AddNoticesComponent;
  let fixture: ComponentFixture<AddNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
