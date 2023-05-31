import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuralumniComponent } from './ouralumni.component';

describe('OuralumniComponent', () => {
  let component: OuralumniComponent;
  let fixture: ComponentFixture<OuralumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuralumniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuralumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
