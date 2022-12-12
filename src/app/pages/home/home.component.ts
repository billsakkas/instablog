import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Landmark } from 'src/app/interfaces/landmark';
import { LandmarkService } from 'src/app/services/landmark/landmark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchState = SearchStates.notSearhing;
  friendlyErrorMessage: string = '';

  popularLandmarks: Landmark[] = [];
  searchedLandmarks: Landmark[] = [];

  searchInput = new FormControl('');

  constructor(private landmarkService: LandmarkService) {}

  async ngOnInit() {
    // Gets featured landmarks on init
    this.popularLandmarks = await this.landmarkService.getLandmarks();
    console.log(this.popularLandmarks);
  }

  // Searches for landmarks
  async search() {
    this.friendlyErrorMessage = '';

    // If the search input is empty, return
    if (!this.searchInput.value) {
      this.searchedLandmarks = [];
      this.searchState = SearchStates.notSearhing;
      return;
    }

    // If the search input is less than 4 characters, display an error
    if (this.textValueIsLessThan(this.searchInput.value, 4)) {
      this.searchedLandmarks = [];
      this.friendlyErrorMessage = 'Please enter at least 4 characters';
      this.searchState = SearchStates.error;
      return;
    }

    // If the search input is greater than 3 characters, set state to 'searching' and start searching
    this.searchState = SearchStates.searching;

    // Search for landmarks
    this.searchedLandmarks = await this.landmarkService.getLandmarksByTitle(
      this.searchInput.value!
    );

    // If no landmarks are found, set state to 'noResults' and display no results
    if (this.searchedLandmarks.length === 0) {
      this.searchState = SearchStates.notFound;
      return;
    }

    // If landmarks are found, set state to 'resultsFound' and display results
    this.searchState = SearchStates.found;
  }

  private textValueIsLessThan = (val: string, num: number) => val.length < num;
}

enum SearchStates {
  notSearhing = 0,
  searching = 1,
  found = 2,
  notFound = 3,
  error = 4,
}
