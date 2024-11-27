import { Injectable } from '@angular/core'
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { AdminDto } from '../../../dto/adminDto'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class UDictSklepyLocationAdmin{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService,
        private snackBar: MatSnackBar
    ){}

    public Post(admin: AdminDto){
        return new Promise((resolve, reject) => {
            this.iKomfortApiConnectionService.postDictSklepyLocationAdmin(admin).subscribe({
                complete: () => {

                },
                next: (result: any) => {
                    let snackBarRef = this.snackBar.open("Zmiana zapisana.", "", {
                        duration: 1500,                 
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'pop-up-success'
                    })
                    resolve(result);
                },
                error: (error) => {
                    let snackBarRef = this.snackBar.open("Błąd podczas logowania.", "", {
                        duration: 1500,                 
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'pop-up-fail'
                    })

                    resolve(error);
                }
            })
        })
    }
}