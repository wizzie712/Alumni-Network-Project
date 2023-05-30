import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurfacultyComponent } from './ourfaculty.component';

describe('OurfacultyComponent', () => {
  let component: OurfacultyComponent;
  let fixture: ComponentFixture<OurfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurfacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
