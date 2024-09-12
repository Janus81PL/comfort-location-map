import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IkomfortApiConnectionService {

  constructor(private http: HttpClient) { }

  getShopLocations(){
    return this.http.get<any>(environment.pathAPI = 'KomfortLocationsMap/GetShopLocations')
  }
}
