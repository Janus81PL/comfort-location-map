import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { LocationDescriptionComponent } from "../location-description/location-description.component";

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [MapComponent, LocationDescriptionComponent],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css',
  schemas: [NO_ERRORS_SCHEMA] //Angular ignoruje nieznane tagi.
})
export class LocationMapComponent {

}
