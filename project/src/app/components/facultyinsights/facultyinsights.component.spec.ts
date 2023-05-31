import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyinsightsComponent } from './facultyinsights.component';

describe('FacultyinsightsComponent', () => {
  let component: FacultyinsightsComponent;
  let fixture: ComponentFixture<FacultyinsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyinsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
