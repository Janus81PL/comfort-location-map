import { Injectable } from '@angular/core'
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { NewAdminDto } from '../../../dto/newAdmintDto'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class CDictSklepyLocationAdmin{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService,
        private snackBar: MatSnackBar
    ){}

    public Post(admin: NewAdminDto){
        return new Promise((resolve, reject) => {
            this.iKomfortApiConnectionService.postCreateDictSklepyLocationAdmin(admin).subscribe({
                complete: () => {

                },
                next: (result: any) => {
                    let snackBarRef = this.snackBar.open("Administrator został dodany.", "", {
                        duration: 1500,                 
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'pop-up-success'
                    })
                    resolve(result);
                },
                error: (error) => {
                    let snackBarRef = this.snackBar.open("Błąd podczas zapisu.", "", {
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