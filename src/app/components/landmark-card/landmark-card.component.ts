import { Component, Input } from '@angular/core';
import { Landmark } from 'src/app/interfaces/landmark';

@Component({
  selector: 'app-landmark-card',
  templateUrl: './landmark-card.component.html',
  styleUrls: ['./landmark-card.component.css'],
})
export class LandmarkCardComponent {
  @Input() landmark: Landmark = {
    id: '0',
    title: '',
    short_info: '',
    photo: '',
    description: '',
    photo_thumb: '',
    order: 0,
    location: [],
    url: '',
    created_at: '',
    updated_at: '',
  };
}
