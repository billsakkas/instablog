import { Component, Input } from '@angular/core';
import { Landmark } from 'src/app/interfaces/landmark';

@Component({
  selector: 'app-landmark-grid',
  templateUrl: './landmark-grid.component.html',
  styleUrls: ['./landmark-grid.component.css'],
})
export class LandmarkGridComponent {
  @Input() title: string = '';
  @Input() landmarks: Landmark[] = [];
  @Input() url: string = '';

  constructor() {}

  ngOnInit(): void {}
}
