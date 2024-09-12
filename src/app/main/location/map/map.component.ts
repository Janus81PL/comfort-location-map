import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ShopsManagement } from '../../../Services/Management/shops-management.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapComponent {
  constructor(private shopsManagement: ShopsManagement) {}

  shops = [
    {'IdSklep': 1, 'cx': 581, 'cy': 360, 'size': 10, 'color': 'red', 'city': 'Warszawa'},
    {'IdSklep': 2, 'cx': 250, 'cy': 350, 'size': 10, 'color': 'blue', 'city': 'Kraków'}
  ]

  onMouseOver(idSklep: number){
    this.shopsManagement.setIdSklep(idSklep);
  }

  onMouseLeave(){
    this.shopsManagement.setIdSklep(0);
  }
}
