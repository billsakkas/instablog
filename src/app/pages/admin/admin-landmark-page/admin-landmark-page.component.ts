import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Landmark } from 'src/app/interfaces/landmark';
import { LandmarkService } from 'src/app/services/landmark/landmark.service';

@Component({
  selector: 'app-admin-landmark-page',
  templateUrl: './admin-landmark-page.component.html',
  styleUrls: ['./admin-landmark-page.component.css'],
})
export class AdminLandmarkPageComponent {
  landmark?: Landmark;
  landmarkForm?: FormGroup;
  imagePreview?: string;
  file: File | null = null;

  async onFileChange(event: any) {
    // If there is no target, it will return
    if (!event.target) return;

    // Get the file from the event
    const file = event.target.files[0];

    // If there is no file, it will return
    if (!file) return;

    // Assign the file to the file variable
    this.file = file;

    // Create a preview of the image
    // Normally we wouldn't do this as it is a security risk (possible XSS),
    // but as this project is only an assignement, it is fine.
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(
      this.document.defaultView?.URL.createObjectURL(this.file!) as string
    ) as string;
    console.log(this.file);
  }

  async onSubmit() {
    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');

    // Modify the landmark
    await this.landmarkService.modifyLandmark(
      {
        ...this.landmarkForm!.value,
        id,
      },
      this.file
    );
    this.router.navigate(['/admin/dashboard']);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private landmarkService: LandmarkService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    console.log('ngOnInit');

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    // If there is no id, it will redirect to the not found page
    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    // If the id is 'new', it will set the landmark and the form
    if (id === 'new') {
      this.landmark = {
        id: '',
        title: '',
        short_info: '',
        description: '',
        photo: '',
        order: 0,
      } as Landmark;

      this.landmarkForm = new FormGroup({
        title: new FormControl(this.landmark.title),
        short_info: new FormControl(this.landmark.short_info),
        description: new FormControl(this.landmark.description),
        photo: new FormControl(),
        order: new FormControl(this.landmark.order),
      });
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
    this.imagePreview = this.landmark.photo;
    this.landmarkForm = new FormGroup({
      title: new FormControl(this.landmark.title),
      short_info: new FormControl(this.landmark.short_info),
      description: new FormControl(this.landmark.description),
      photo: new FormControl(),
      order: new FormControl(this.landmark.order),
    });
  }
}
