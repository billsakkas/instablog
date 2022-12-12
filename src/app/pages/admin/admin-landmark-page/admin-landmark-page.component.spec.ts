import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLandmarkPageComponent } from './admin-landmark-page.component';

describe('AdminLandmarkPageComponent', () => {
  let component: AdminLandmarkPageComponent;
  let fixture: ComponentFixture<AdminLandmarkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLandmarkPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLandmarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
