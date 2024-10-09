import { Component, NO_ERRORS_SCHEMA, effect } from '@angular/core';
import { ShopsManagement } from '../../../Services/Management/shops-management.service';
import { GetShopLocations } from '../../../Services/DbCRUD/DbRead/RShopLocations';
import { UserDto } from '../../../dto/userDto';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'
import { ShopsRequest } from '../../../Requests/shopsRequest';

import { MatDialog } from '@angular/material/dialog';
import { EditStoreLocationComponent } from '../../Modals/edit-store-location/edit-store-location.component';
import { UShopLocations } from '../../../Services/DbCRUD/DbUpdate/UShopLocations'

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
    private getShopLocations: GetShopLocations,
    private uShopLocations: UShopLocations,

    public dialog: MatDialog
  ) {
    effect(() => {
      this.SortStoresWithAssignedLocationByParams(this.shopsManagement.getShopRequest());
    })
  }

  j: number = 1;
  cy: number = 20;

  storeWithoutAssignedLocation!: KomfortLocationMapDto[];

  storeWithAssignedLocation!: KomfortLocationMapDto[];
  storeWithAssignedLocationToDisplay!: KomfortLocationMapDto[];

  selectedStore: KomfortLocationMapDto | undefined

  tooltipText: string = '';   // Zawartość dymka
  tooltipX: number = 0;       // Pozycja X dymka
  tooltipY: number = 0;       // Pozycja Y dymka
  tooltipVisible: boolean = false;  // Flaga, czy dymek jest widoczny

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

  private SortStoresWithAssignedLocationByParams(request: ShopsRequest | undefined){

    this.storeWithAssignedLocationToDisplay = []

    try{
      if(request != undefined){
        console.info("request: ", request);

        if(request!.idRegion != 0) {
          this.storeWithAssignedLocationToDisplay = this.storeWithAssignedLocation.filter(a => a.idRegion == request!.idRegion)
        } else {
          this.storeWithAssignedLocationToDisplay = this.storeWithAssignedLocation;
        }
  
        if(request!.idDictSklepyTyp != 0){
          this.storeWithAssignedLocationToDisplay = this.storeWithAssignedLocationToDisplay.filter(a => a.idDictSklepyTyp == request!.idDictSklepyTyp)
        }
  
        if(request!.idDictSklepyRodzaj != 0){
          this.storeWithAssignedLocationToDisplay = this.storeWithAssignedLocationToDisplay.filter(a => a.idDictSklepyRodzaj == request!.idDictSklepyRodzaj)
        }
      }
    } catch(err) {
      console.error("SortStoresWithAssignedLocationByParams(): ", err);
    }
  }

  onMouseOver(idSklep: number){
    this.shopsManagement.setIdSklep(idSklep);
  }

  onMouseLeave(){
    //this.shopsManagement.setIdSklep(0);
  }

  onMouseMove(event: MouseEvent){
    if(this.selectedStore != undefined){
      this.selectedStore.cx = event.clientX;
      this.selectedStore.cy = event.clientY - 53;
    }
  }

  onMouseClick(event: MouseEvent, idSklep: number) : void {
    if(this.selectedStore == undefined) {
      this.selectedStore = this.storeWithoutAssignedLocation.find(a => a.idSklep == idSklep)
    } else {
      this.uShopLocations.Post(this.selectedStore)
        .then((r) => {
          this.selectedStore = undefined
        })
        .catch((e) => {
          alert("Coś poszło nie tak: " + e.toString())
        })
    }

    console.info(this.selectedStore);
  }

  onMouseDbClick(idSklep: number) : void {
    console.info("onUnassignedShopClick: ", idSklep)

    let dialogRef = this.dialog.open(EditStoreLocationComponent, {
      height: '300px',
      width: '600px',
      position: {right: '20px'},
      data: this.storeWithoutAssignedLocation.find(a => a.idSklep == idSklep)
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.info("result: ", result);
      }
    )
  }
}
