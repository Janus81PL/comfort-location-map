import { Injectable } from "@angular/core";
import { IkomfortApiConnectionService } from "../../Connections/ikomfort-api-connection.service";
import { PracownikDto } from "../../../dto/pracownikDto";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class RPracownicy{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService,
        private snackBar: MatSnackBar
    ){}

    public Get(){
        return new Promise<PracownikDto[]>((resolve, reject) => {
            this.iKomfortApiConnectionService.getEmployees().subscribe({
                complete: () => {
/*                     console.info("Lista typów sklepów pobrana.") */
                },
                next: (result) => {
                    let snackBarRef = this.snackBar.open("Dane odświerzone.", "", {
                        duration: 1500,                 
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'pop-up-success'
                    })

                    resolve(result);
                },
                error: (error) => {
                    let snackBarRef = this.snackBar.open("Błąd podczas pobrania listy pracowników.", "", {
                        duration: 1500,                 
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'pop-up-fail'
                    })

                    reject(error)
                }
            })
        })
    }
}