import { Injectable } from '@angular/core'
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'

export class UShopLocations{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Post(location: KomfortLocationMapDto){
        return new Promise((resolve, reject) => {
            this.iKomfortApiConnectionService.postShopLocations(location).subscribe({
                complete: () => {

                },
                next: (result: any) => {
                    console.info("UShopLocations.Post result: ", result)
                    resolve(result);
                },
                error: (error) => {
                    console.error("Błąd podczas aktualizacji bazy danych!")
                    resolve(error);
                }
            })
        })
    }
}