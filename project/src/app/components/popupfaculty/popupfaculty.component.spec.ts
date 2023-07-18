import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupfacultyComponent } from './popupfaculty.component';

describe('PopupfacultyComponent', () => {
  let component: PopupfacultyComponent;
  let fixture: ComponentFixture<PopupfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupfacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
