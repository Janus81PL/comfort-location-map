import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
//import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IKomfortConnectionService {

  constructor(private http: HttpClient) { }

  getUserData(){
    return this.http.get<any>(
      environment.pathKomfortCore + 'Home/LoggedUser',
      { withCredentials: true }
    )
  }
}
