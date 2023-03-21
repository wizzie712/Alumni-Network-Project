import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdashboardProfileComponent } from './studentdashboard-profile.component';

describe('StudentdashboardProfileComponent', () => {
  let component: StudentdashboardProfileComponent;
  let fixture: ComponentFixture<StudentdashboardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentdashboardProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentdashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
