import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudlistComponent } from './crudlist.component';

describe('CrudlistComponent', () => {
  let component: CrudlistComponent;
  let fixture: ComponentFixture<CrudlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
