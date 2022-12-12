import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  file: File | null = null;

  async onFileChange(event: any) {
    if (!event.target) return;
    const file = event.target.files[0];
    if (!file) return;

    console.log(file);
  }

  constructor() {}

  ngOnInit(): void {}
}
