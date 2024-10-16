import { Component, OnInit, effect } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FormsModule } from '@angular/forms';

import { ShopsManagement } from '../../../Services/Management/shops-management.service';
import { DictSklepyDto } from '../../../dto/dictSklepyDto';
import { RShopData } from '../../../Services/DbCRUD/DbRead/RShopData';
import { DictRegionDto } from '../../../dto/dictRegionyDto';
import { RDictRegions } from '../../../Services/DbCRUD/DbRead/RDictRegions';
import { RDictSklepyRodzaj } from '../../../Services/DbCRUD/DbRead/RDictSklepyRodzaj';
import { RDictSklepyTyp } from '../../../Services/DbCRUD/DbRead/RDictSklepyTyp';
import { DictSklepyRodzajDto } from '../../../dto/dictSklepyRodzajDto';
import { DictSklepyTypDto } from '../../../dto/dictSklepyTypDto';
import { ShopsRequest } from '../../../Requests/shopsRequest';

@Component({
  selector: 'app-location-description',
  standalone: true,
  imports: [MapComponent, FormsModule],
  templateUrl: './location-description.component.html',
  styleUrl: './location-description.component.css'
})
export class LocationDescriptionComponent {
  idSklep = 0;
  shop: DictSklepyDto = new DictSklepyDto();

  regions!: DictRegionDto[];
  rodzajeSklepow!: DictSklepyRodzajDto[];
  typySklepow!: DictSklepyTypDto[];

  idRegion = 0;
  public shopsRequest = new ShopsRequest();

  constructor(
    private shopsManagement: ShopsManagement,
    private rShopData: RShopData,
    private rDictRegions: RDictRegions,
    private rDictSklepyRodzaj: RDictSklepyRodzaj,
    private rDictSklepyTyp: RDictSklepyTyp
    )
    {
      effect(() => {
        this.idSklep = this.shopsManagement.getIdSklep();

        if(this.shopsManagement.getIdSklep() > 0) {
          this.rShopData.Get(this.shopsManagement.getIdSklep())
            .then((result) => {          
              this.shop = result;
            })
            .catch((error) => {
              console.error("this.rShopData.Get(): ", error)
            })
        } else {
          this.shop = new DictSklepyDto();
        }
      })
  }

  ngOnInit(): void{
    this.rDictRegions.Get()
      .then((r: DictRegionDto[]) => {
        this.regions = r;
      })
      .catch((e) => {
        console.error("this.rDictRegions.Get(): ", e);
      })

      this.rDictSklepyRodzaj.Get()
      .then((r: DictSklepyRodzajDto[]) => {
        this.rodzajeSklepow = r;
      })
      .catch((e) => {
        console.error("this.rDictSklepyRodzaj.Get(): ", e);
      })

      this.rDictSklepyTyp.Get()
      .then((r: DictSklepyTypDto[]) => {
        this.typySklepow = r;
      })
      .catch((e) => {
        console.error("this.rDictSklepyTyp.Get(): ", e);
      })
  }

  ChangeShopsRequest(){
    this.shopsManagement.setShopRequest(undefined);
    this.shopsManagement.setShopRequest(this.shopsRequest);
  }
}
