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
      this.SortStoresWithAssignedLocationByParams(this.storeWithAssignedLocation, this.shopsManagement.getShopRequest())
        .then((r) => {
          this.storeWithAssignedLocationToDisplay = r as KomfortLocationMapDto[];
        })
        .catch((e) => {
          console.error(e);
        })
    })
  }

  storeWithoutAssignedLocation!: KomfortLocationMapDto[];

  public storeWithAssignedLocation!: KomfortLocationMapDto[];
  public storeWithAssignedLocationToDisplay!: KomfortLocationMapDto[];

  selectedStore: KomfortLocationMapDto | undefined

  ngOnInit(): void {
    this.ReloadShops();
  }

  GetStoresWithAssignedLocation(fullStoresList: KomfortLocationMapDto[]){
    return new Promise((resolve, reject) => {
      try{
        let storeWithAssignedLocation = [] as KomfortLocationMapDto[];
        storeWithAssignedLocation = fullStoresList.filter(a => a.cx != 0)
        resolve(storeWithAssignedLocation);
      } catch(err){
        reject(err);
      }
    })
  }

  GetStoresWithoutAssignedLocation(fullStoresList: KomfortLocationMapDto[]){
    return new Promise((resolve, reject) => {
      try{
        let j: number = 1;
        let cy: number = 20;
        let storeWithoutAssignedLocation = [] as KomfortLocationMapDto[];

        storeWithoutAssignedLocation = fullStoresList.filter(a => a.cx == 0)

        for(let i = 0; i < storeWithoutAssignedLocation.length; i++){
          cy = 20;
        }

        for(let i = 0; i < storeWithoutAssignedLocation.length; i++){
          if(j > 30){
            j = 1;
            cy = cy + 20;
          }

          storeWithoutAssignedLocation[i].cx = j * 20;
          storeWithoutAssignedLocation[i].cy = cy;

          j++;
        }
        resolve(storeWithoutAssignedLocation);
      } catch(err){
        reject(err);
      }
    })
  }

  private ReloadShops(){
    this.getShopLocations.Get()
      .then((result: KomfortLocationMapDto[]) => {

        this.GetStoresWithoutAssignedLocation(result)
          .then((r) => {
            this.storeWithoutAssignedLocation = r as KomfortLocationMapDto[];
          })
          .catch((e) => {
            console.error(e);
          })

        this.GetStoresWithAssignedLocation(result)
          .then((r) => {

            this.storeWithAssignedLocation = r as KomfortLocationMapDto[];

            this.SortStoresWithAssignedLocationByParams(r as KomfortLocationMapDto[], this.shopsManagement.getShopRequest())
              .then((r) => {
                this.storeWithAssignedLocationToDisplay = r as KomfortLocationMapDto[];
              })
              .catch((e) => {
                console.error(e);
              })
          })
          .catch((e) => {
            console.error(e);        
          })
      })
      .catch((e: any) => {
        console.error("getShopLocations.Get(): ", e);
      })
  }

  private SortStoresWithAssignedLocationByParams(fullStoresList: KomfortLocationMapDto[], request: ShopsRequest | undefined){
    return new Promise((resolve, reject) => {

      let storeWithAssignedLocationToDisplay = [] as KomfortLocationMapDto[];

      if(fullStoresList != undefined){
        try{
          if(request != undefined){
            if(request.idRegion != 0){
              let testList = [] as KomfortLocationMapDto[]

              testList = JSON.parse(JSON.stringify(fullStoresList));
              storeWithAssignedLocationToDisplay = testList.filter(a => a.idRegion == request.idRegion)
                .map(a => ({idLocation: a.idLocation
                  , idSklep: a.idSklep
                  ,idRegion: a.idRegion
                  ,idDictSklepyTyp: a.idDictSklepyTyp
                  ,idDictSklepyRodzaj: a.idDictSklepyRodzaj
                  ,cx: a.cx
                  ,cy: a.cy
                  ,size: a.size
                  ,color: a.color,
                  address: a.address
                }))

              console.table(testList)
              console.table(storeWithAssignedLocationToDisplay)
            } else {
              storeWithAssignedLocationToDisplay = fullStoresList;
            }         
          }
          resolve(storeWithAssignedLocationToDisplay);
        } catch(err) {
          reject(err);
        }
      } else {
        resolve(storeWithAssignedLocationToDisplay);
      }
    })
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
      if(this.selectedStore === undefined)
      {
        this.selectedStore = this.storeWithAssignedLocation.find(a => a.idSklep == idSklep);
      }
    } else {
      this.uShopLocations.Post(this.selectedStore)
        .then((r: any) => {
          this.selectedStore = undefined
          this.ReloadShops();
        })
        .catch((e: any) => {
          alert("Coś poszło nie tak: " + e.toString())
        })
    }
  }

  onMouseRButtonClick(event: Event, idSklep: number) : void {
    event.preventDefault();
    let data = undefined;

    data = this.storeWithoutAssignedLocation.find(a => a.idSklep == idSklep)

    if(data === undefined)
      data = this.storeWithAssignedLocation.find(a => a.idSklep == idSklep);

    if(data !== undefined) {
      let dialogRef = this.dialog.open(EditStoreLocationComponent, {
        height: '300px',
        width: '600px',
        position: {right: '20px'},
        data: data
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if(result !== null){
            this.uShopLocations.Post(result)
            .then((r: any) => {
              this.selectedStore = undefined
              this.ReloadShops();
            })
            .catch((e: any) => {
              alert("Coś poszło nie tak: " + e.toString())
            })
          }
        }
      )
    }
  }
}
