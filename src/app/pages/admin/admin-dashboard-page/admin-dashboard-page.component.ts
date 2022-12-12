import { Component } from '@angular/core';
import { Landmark } from 'src/app/interfaces/landmark';
import { LandmarkService } from 'src/app/services/landmark/landmark.service';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css'],
})
export class AdminDashboardPageComponent {
  landmarks: Landmark[] = [];

  constructor(private landmarkService: LandmarkService) {}
  async ngOnInit() {
    this.landmarks = await this.landmarkService.getLandmarks();
  }
}
