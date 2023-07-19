import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticepopupComponent } from './noticepopup.component';

describe('NoticepopupComponent', () => {
  let component: NoticepopupComponent;
  let fixture: ComponentFixture<NoticepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
