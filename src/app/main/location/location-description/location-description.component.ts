import { Component, OnInit, effect } from '@angular/core';
import { MapComponent } from '../map/map.component';

import { ShopsManagement } from '../../../Services/shops-management.service';

@Component({
  selector: 'app-location-description',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location-description.component.html',
  styleUrl: './location-description.component.css'
})
export class LocationDescriptionComponent {
  idSklep = 0;

  constructor(private shopsManagement: ShopsManagement) {
    effect(() => {
      this.idSklep = this.shopsManagement.getIdSklep();
    })
  }
}
