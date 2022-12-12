import { Component } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Landmark } from 'src/app/interfaces/landmark';
import { LandmarkService } from 'src/app/services/landmark/landmark.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landmark-page',
  templateUrl: './landmark-page.component.html',
  styleUrls: ['./landmark-page.component.css'],
})
export class LandmarkPageComponent {
  pageState: pageStates = pageStates.loading;
  expandButtonText: string = 'Expand';
  descriptionText: string = '';
  googleMapsQuery: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=25.1972125%2C55.2742912&key=${environment.googleMapsApiKey}`
    );
  landmark!: Landmark;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landmarkService: LandmarkService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    // If there is no id, it will redirect to the not found page
    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    // Get the landmark using the id
    const tmpLandmark = await this.landmarkService.getLandmarkById(id);

    // If there is no landmark, it will redirect to the not found page
    if (!tmpLandmark) {
      this.router.navigate(['/not-found']);
      return;
    }

    // If there is a landmark, it will set the landmark and the form
    this.landmark = tmpLandmark;
    this.descriptionText = this.landmark.description.substring(0, 200) + '...';

    // Google Maps
    if (this.landmark.location && this.landmark.location.length === 2) {
      const lat = this.landmark.location.at(1);
      const lng = this.landmark.location.at(0);
      this.googleMapsQuery = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/place?q=${lat}%2C${lng}&key=${environment.googleMapsApiKey}`
      );
    }

    this.pageState = pageStates.loaded;
  }

  generateGoogleMapsQuery(lat: number, lng: number) {
    const query = lat + ',' + lng;
    return (
      'https://maps.google.com/maps?&amp;q=' +
      encodeURIComponent(query) +
      '&amp;output=embed'
    );
  }

  expandDescription() {
    if (this.expandButtonText === 'Expand') {
      this.descriptionText = this.landmark.description;
      this.expandButtonText = 'Collapse';
    } else {
      this.descriptionText =
        this.landmark.description.substring(0, 200) + '...';
      this.expandButtonText = 'Expand';
    }
  }
}

enum pageStates {
  loading = 0,
  loaded = 1,
  error = 2,
}
