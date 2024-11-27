import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { environment } from '../../../environments/environment.prod';
import { environment } from '../../../environments/environment';

import { KomfortLocationMapDto } from '../../dto/komfortLocationMapDto';
import { DictSklepyDto } from '../../dto/dictSklepyDto';
import { DictRegionDto } from '../../dto/dictRegionyDto';
import { DictSklepyRodzajDto } from '../../dto/dictSklepyRodzajDto';
import { DictSklepyTypDto } from '../../dto/dictSklepyTypDto';
import { UserRequestDto } from '../../dto/userRequestDto';
import { AdminDto } from '../../dto/adminDto';

@Injectable({
  providedIn: 'root'
})
export class IkomfortApiConnectionService {

  constructor(private http: HttpClient) { }

  getUserData(){
    let login = 'pawelka';

    return this.http.get<any>(
      environment.pathAPI + 'API/KomfortLocationsMap/GetLoggedUser/' + login,
    )
  }

  //GET
  getShopLocations(){
    return this.http
      .get<KomfortLocationMapDto[]>(
      environment.pathAPI + 'API/KomfortLocationsMap/GetShopLocations',
      { /* withCredentials: true */ }
      )
  }

  getShopData(idSklep: number){
    return this.http
      .get<DictSklepyDto>(
        environment.pathAPI + 'API/KomfortLocationsMap/GetShop/' + idSklep
      )
  }

  getDictRegiony(){
    return this.http
      .get<DictRegionDto[]>(
        environment.pathAPI + 'API/KomfortLocationsMap/GetRegions/'
      )
  }

  getDictSklepyRodzaj(){
    return this.http
      .get<DictSklepyRodzajDto[]>(
        environment.pathAPI + 'API/KomfortLocationsMap/GetSklepyRodzaj/'
      )
  }

  getDictSklepyTyp(){
    return this.http
      .get<DictSklepyTypDto[]>(
        environment.pathAPI + 'API/KomfortLocationsMap/GetSklepyTyp/'
      )
  }

  getDictSklepyLocationAdmins() {
    return this.http
      .get<AdminDto[]>(
        environment.pathAPI + 'API/KomfortLocationsMap/GetDictSklepyLocationAdmins/'
      )
  }

  //POST
  postShopLocations(location: KomfortLocationMapDto){
    return this.http
      .post(environment.pathAPI + 'API/KomfortLocationsMap/UpdateShopLocation/', location)
  }

  postUserLogin(user: UserRequestDto){
    return this.http
      .post(environment.pathAPI + 'API/KomfortLocationsMap/KomfortLocationLogin/', user)
  }

  postDictSklepyLocationAdmin(admin: AdminDto){
    return this.http
      .post(environment.pathAPI + 'API/KomfortLocationsMap/UpdateDictSklepyLocationAdmin/', admin)
  }
}
