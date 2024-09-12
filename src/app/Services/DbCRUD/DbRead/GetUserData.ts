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

    user!: UserDto

    public Get(): UserDto{
        this.iKomfortConnection.getUserData().subscribe({
            complete: () => {
              console.info("complete")
            },
            next: (result: any) => {
              console.info("response: ", result)
              this.user = result;
            },
            error: (error: any) => {
              console.info("error: ", error)
      
              const testUser :UserDto = {
                idPracownika: 59,
                login: 'pawelka',
                imie: 'Freddy',
                nazwisko: 'Mercury',
                rola: 5,
                aktywny: 1
              }
      
              this.user = testUser;
            }
        })

        return this.user;
    }
}