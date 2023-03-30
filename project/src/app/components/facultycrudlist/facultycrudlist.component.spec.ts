import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultycrudlistComponent } from './facultycrudlist.component';

describe('FacultycrudlistComponent', () => {
  let component: FacultycrudlistComponent;
  let fixture: ComponentFixture<FacultycrudlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultycrudlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultycrudlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
