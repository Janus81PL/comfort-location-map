import { Injectable, effect, signal } from '@angular/core';
import { ShopsRequest } from '../../Requests/shopsRequest';

@Injectable({
  providedIn: 'root' // Umożliwia wstrzykiwanie serwisu w całej aplikacji
})
export class ShopsManagement {
    private idSklep = signal<number>(0);
    private shopRequest = signal<ShopsRequest | undefined>(new ShopsRequest());

  constructor()
  { 
    effect(() => {

    })
  }

  getShopRequest(){
    return this.shopRequest();
  }

  setShopRequest(request: ShopsRequest | undefined){
    this.shopRequest.set(request);
  }

  getIdSklep(){
    return this.idSklep();
  }

  setIdSklep(idSklep: number){
    this.idSklep.set(idSklep)
  }
}