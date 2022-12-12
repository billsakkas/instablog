import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkGridComponent } from './landmark-grid.component';

describe('LandmarkGridComponent', () => {
  let component: LandmarkGridComponent;
  let fixture: ComponentFixture<LandmarkGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandmarkGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
