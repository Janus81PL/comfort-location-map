import { Injectable } from '@angular/core'
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class UShopLocations{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService,
        private snackBar: MatSnackBar
    ){}

    public Post(location: KomfortLocationMapDto){
        return new Promise((resolve, reject) => {
            this.iKomfortApiConnectionService.postShopLocations(location).subscribe({
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