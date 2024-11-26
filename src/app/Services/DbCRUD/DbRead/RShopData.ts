import { Injectable } from '@angular/core';
import { DictSklepyDto } from '../../../dto/dictSklepyDto';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';

@Injectable({
    providedIn: 'root'
})

export class RShopData{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(idSklep: number){
        return new Promise<DictSklepyDto>((resolve, reject) => {
            this.iKomfortApiConnectionService.getShopData(idSklep).subscribe({
                complete: () => {
                    
                },
                next: (result: DictSklepyDto) => {
                    resolve(result);
                },
                error: (error) => {
                    console.error("Nie udało się pobrać danych sklepu: ", error)
                }
            });
        });
    }
}