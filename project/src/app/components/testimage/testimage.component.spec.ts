import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimageComponent } from './testimage.component';

describe('TestimageComponent', () => {
  let component: TestimageComponent;
  let fixture: ComponentFixture<TestimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
