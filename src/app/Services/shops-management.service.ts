import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Umożliwia wstrzykiwanie serwisu w całej aplikacji
})
export class ShopsManagement {
    private idSklep = signal<number>(0);

  constructor() { 
    effect(() => {
        console.info("Effect: ", this.idSklep())
    })
  }

    getIdSklep(){
        return this.idSklep();
    }

    setIdSklep(idSklep: number){
        this.idSklep.set(idSklep)
    }
}