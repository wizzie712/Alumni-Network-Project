import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurstudentsComponent } from './ourstudents.component';

describe('OurstudentsComponent', () => {
  let component: OurstudentsComponent;
  let fixture: ComponentFixture<OurstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurstudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
