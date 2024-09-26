import { Component, OnInit, effect } from '@angular/core';
import { MapComponent } from '../map/map.component';

import { ShopsManagement } from '../../../Services/Management/shops-management.service';
import { DictSklepyDto } from '../../../dto/dictSklepyDto';
import { RShopData } from '../../../Services/DbCRUD/DbRead/RShopData';

@Component({
  selector: 'app-location-description',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location-description.component.html',
  styleUrl: './location-description.component.css'
})
export class LocationDescriptionComponent {
  idSklep = 0;
  shop!: DictSklepyDto;

  constructor(
    private shopsManagement: ShopsManagement,
    private rShopData: RShopData
    ) {
    effect(() => {
      this.idSklep = this.shopsManagement.getIdSklep();

      if(this.shopsManagement.getIdSklep() > 0) {
        this.rShopData.Get(this.shopsManagement.getIdSklep())
          .then((result) => {
            console.info("result: RShopData => ", result);
          })
          .catch((error) => {
            console.error("this.rShopData.Get(): ", error)
          })
      } else {

      }
    })
  }
}
