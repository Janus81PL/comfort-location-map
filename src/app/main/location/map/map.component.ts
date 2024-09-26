import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ShopsManagement } from '../../../Services/Management/shops-management.service';
import { GetShopLocations } from '../../../Services/DbCRUD/DbRead/RShopLocations';
import { UserDto } from '../../../dto/userDto';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapComponent {
  constructor(
    private shopsManagement: ShopsManagement,
    private getShopLocations: GetShopLocations
  ) {}

  j: number = 1;
  cy: number = 20;

  storeWithoutAssignedLocation!: KomfortLocationMapDto[];
  storeWithAssignedLocation!: KomfortLocationMapDto[];

  ngOnInit(): void {
    this.getShopLocations.Get()
      .then((result: KomfortLocationMapDto[]) => {
        this.storeWithAssignedLocation = result.filter(a => a.cx != 0)
        this.storeWithoutAssignedLocation = result.filter(a => a.cx == 0)

        for(let i = 0; i < this.storeWithoutAssignedLocation.length; i++){
          if(this.j > 30){
            this.j = 1;
            this.cy = this.cy + 20;
          }

          this.storeWithoutAssignedLocation[i].cx = this.j * 20;
          this.storeWithoutAssignedLocation[i].cy = this.cy;

          this.j++;
        }
      })
      .catch((e: any) => {
        console.error("getShopLocations.Get(): ", e);
      })
  }

  onMouseOver(idSklep: number){
    this.shopsManagement.setIdSklep(idSklep);
  }

  onMouseLeave(){
    this.shopsManagement.setIdSklep(0);
  }

  onMouseOverUnassignedShop(idSklep: number){
    this.shopsManagement.setIdSklep(idSklep);
  }

  onMouseLeaveUnassignedShop(){
    this.shopsManagement.setIdSklep(0);
  }
}
