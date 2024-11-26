import { Injectable } from '@angular/core';
import { UserDto } from '../../../dto/userDto';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { IKomfortConnectionService } from '../../Connections/ikomfort-connection.service';

@Injectable({
    providedIn: 'root'
})

export class GetUserData{
    constructor(
        private ikomfortApiConnectionService: IkomfortApiConnectionService,
        private iKomfortConnectionService: IKomfortConnectionService
    ){}

    public Get(){
      return new Promise<UserDto>((resolve, reject) => {
        this.ikomfortApiConnectionService.getUserData().subscribe({
          complete: () => {
/*             console.info("GetUserData.Get(): Dane zalogowanego użytkownika pobrane.") */
          },
          next: (result: any) => {
            resolve(result);
          },
          error: (error: any) => {
            console.error("GetUserData.Get(): Nie udało się pobrać danych zalogowanego użytkownika!: ", error);

            const user :UserDto = {
              idPracownika: 0,
              login: '',
              imie: 'Freddy',
              nazwisko: 'Mercury',
              rola: 0,
              email: '',
              isKomfortLocationsAdmin: false,
              token: '',
              aktywny: 0
            }
    
            reject(user);
          }
        })
      })
    }
}