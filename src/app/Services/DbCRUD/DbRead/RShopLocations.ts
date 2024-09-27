import { Injectable } from '@angular/core';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'

@Injectable({
    providedIn: 'root'
})

export class GetShopLocations{
    constructor(
        private ikomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(){
        return new Promise<KomfortLocationMapDto[]>((resolve, reject) => {
            this.ikomfortApiConnectionService.getShopLocations().subscribe({
                complete: () => {
                    console.info("Lokalizacje sklepów pobrane.");
                },
                next: (result: KomfortLocationMapDto[]) => {
                    resolve(result)
                },
                error: (error) => {
                    console.error("Nie udało się pobrać listy lokalizacji: ", error)
                    reject(error)
                }
            });
        });
    }
}