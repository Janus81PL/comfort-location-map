import { Component, NO_ERRORS_SCHEMA, effect } from '@angular/core';
import { ShopsManagement } from '../../../Services/Management/shops-management.service';
import { GetShopLocations } from '../../../Services/DbCRUD/DbRead/RShopLocations';
import { UserDto } from '../../../dto/userDto';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'
import { ShopsRequest } from '../../../Requests/shopsRequest';

import { MatDialog } from '@angular/material/dialog';
import { EditStoreLocationComponent } from '../../Modals/edit-store-location/edit-store-location.component';
import { UShopLocations } from '../../../Services/DbCRUD/DbUpdate/UShopLocations'

import { MatTableDataSource } from '@angular/material/table';
import { SpinnerManagementService } from '../../../Services/Management/spinner-management.service';
import { UserManagementService } from '../../../Services/Management/user-management.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapComponent {
  private userData : UserDto | undefined;

  constructor(
    private shopsManagement: ShopsManagement,
    private getShopLocations: GetShopLocations,
    private uShopLocations: UShopLocations,
    private spinnerManagementService: SpinnerManagementService,
    private userManagementService: UserManagementService,

    public dialog: MatDialog
  ) {
    effect(() => {
      this.spinnerManagementService.SpinnerOn();
      this.userData = this.userManagementService.getUser();
      this.SortStoresWithAssignedLocationByParams(this.storeWithAssignedLocation, this.shopsManagement.getShopRequest())
        .then((r: KomfortLocationMapDto[]) => {
          this.storeWithAssignedLocationToDisplay = [] as KomfortLocationMapDto[]

          setTimeout(() => {
            this.storeWithAssignedLocationToDisplay = r;
            this.spinnerManagementService.SpinnerOff()
          }, 500);
        })
        .catch((e) => {
          console.error(e);
          this.spinnerManagementService.SpinnerOff()
        })
    }, {allowSignalWrites: true})
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
                setTimeout(() => {
                  this.storeWithAssignedLocationToDisplay = r as KomfortLocationMapDto[];
                  this.spinnerManagementService.SpinnerOff()
                }, 500);
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

  private SortStoresWithAssignedLocationByParams(fullStoresList: KomfortLocationMapDto[], request: ShopsRequest | undefined)  : Promise<KomfortLocationMapDto[]>{
    return new Promise((resolve, reject) => {

      let storeWithAssignedLocationToDisplay = [] as KomfortLocationMapDto[];

      if(fullStoresList != undefined){
        try{
          if(request != undefined){
            if(request.idRegion != 0 || request.idDictSklepyRodzaj != 0 || request.idDictSklepyTyp){
              storeWithAssignedLocationToDisplay = fullStoresList.filter(a =>
                ( request.idRegion == 0 || a.idRegion == request.idRegion) &&
                ( request.idDictSklepyRodzaj == 0 || a.idDictSklepyRodzaj == request.idDictSklepyRodzaj) &&
                ( request.idDictSklepyTyp == 0 || a.idDictSklepyTyp == request.idDictSklepyTyp )
                )
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
      this.selectedStore.cy = event.clientY - 54;
    }
  }

  IsUserLogged() : boolean{
    if(this.userData != undefined)
      return true

    return false;
  }

  onMouseClick(event: MouseEvent, idSklep: number) : void {
    if(this.IsUserLogged()){
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
    } else {

    }
  }

  onMouseRButtonClick(event: Event, idSklep: number) : void {
    event.preventDefault();
    let data = undefined;

    if(this.IsUserLogged()){
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
    } else {

    }
  }
}
