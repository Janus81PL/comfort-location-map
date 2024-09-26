import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { KomfortLocationMapDto } from '../../dto/komfortLocationMapDto';
import { DictSklepyDto } from '../../dto/dictSklepyDto';
import { DictRegionDto } from '../../dto/dictRegionyDto';
import { DictSklepyRodzajDto } from '../../dto/dictSklepyRodzajDto';
import { DictSklepyTypDto } from '../../dto/dictSklepyTypDto';

@Injectable({
  providedIn: 'root'
})
export class IkomfortApiConnectionService {

  constructor(private http: HttpClient) { }

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
        environment.pathAPI + 'API/KomfortLocationsMap/GetRegiony/'
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
}
