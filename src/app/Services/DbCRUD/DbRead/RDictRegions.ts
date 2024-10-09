import { Injectable } from '@angular/core';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { DictRegionDto } from '../../../dto/dictRegionyDto';

@Injectable({
    providedIn: 'root'
})

export class RDictRegions{
    constructor(
        private ikomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(){
        return new Promise<DictRegionDto[]>((resolve, reject) => {
            this.ikomfortApiConnectionService.getDictRegiony().subscribe({
                complete: () => {
/*                     console.info("Lista regionów pobrana."); */
                },
                next: (result: DictRegionDto[]) => {
                    resolve(result);
                },
                error: (error) => {
                    console.error("Nie udało się pobrać listy regionów: ", error);
                    reject(error);
                }
            })
        })
    }
}