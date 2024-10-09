import { Injectable } from '@angular/core';
import { UserDto } from '../../../dto/userDto';
import { IKomfortConnectionService } from '../../Connections/ikomfort-connection.service';

@Injectable({
    providedIn: 'root'
})

export class GetUserData{
    constructor(
        private iKomfortConnection: IKomfortConnectionService
    ){}

    public Get(){
      return new Promise<UserDto>((resolve, reject) => {
        this.iKomfortConnection.getUserData().subscribe({
          complete: () => {
/*             console.info("GetUserData.Get(): Dane zalogowanego użytkownika pobrane.") */
          },
          next: (result: any) => {
            resolve(result);
          },
          error: (error: UserDto) => {
            console.error("GetUserData.Get(): Nie udało się pobrać danych zalogowanego użytkownika!");

            const user :UserDto = {
              idPracownika: 59,
              login: 'pawelka',
              imie: 'Freddy',
              nazwisko: 'Mercury',
              rola: 5,
              aktywny: 1
            }
    
            reject(user);
          }
        })
      })
    }
}