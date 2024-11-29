import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from '../../../dto/userDto';
import { UserRequestDto } from '../../../dto/userRequestDto';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { SpinnerManagementService } from '../../Management/spinner-management.service';

@Injectable({
  providedIn: 'root'
})
export class RUserLoginService {

  constructor(
    private ikomfortApiConnectionService: IkomfortApiConnectionService,
    private snackBar: MatSnackBar,
    private spinnerManagementService: SpinnerManagementService
  ) { }

  public Get(user: UserRequestDto){
    return new Promise<any>((resolve, reject) => {
      this.spinnerManagementService.SpinnerOn()

      this.ikomfortApiConnectionService.postUserLogin(user).subscribe({
        complete: () => {
          this.spinnerManagementService.SpinnerOff();
        },
        next: (result: any) => {
          let snackBarRef = this.snackBar.open("Zalogowano pomyślnie!", "", {
            duration: 1500,                 
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'pop-up-success',
          })

          resolve(result);
        },
        error: (error: any) => {
          let snackBarRef = this.snackBar.open("Bład podczas zapisu!", "", {
            duration: 1500,                 
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'pop-up-fail'
          })

          const user :UserDto = {
            idPracownika: 0,
            login: '',
            imie: 'Fredy',
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
