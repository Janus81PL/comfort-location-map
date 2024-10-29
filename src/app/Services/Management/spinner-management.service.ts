import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerManagementService {
  private spinnerStatus = signal<boolean>(false);

  constructor() { }

  SpinnerOn(){
    this.spinnerStatus.set(true)
  }

  SpinnerOff(){
    this.spinnerStatus.set(false)
  }

  GetSpinnerStatus(){
    return this.spinnerStatus();
  }
}
