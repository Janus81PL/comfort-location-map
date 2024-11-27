import { Injectable } from '@angular/core';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { AdminDto } from '../../../dto/adminDto';

@Injectable({
    providedIn: 'root'
})

export class RDictSklepyLocationAdmins{
    constructor(
        private ikomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(){
        return new Promise<AdminDto[]>((resolve, reject) => {
            this.ikomfortApiConnectionService.getDictSklepyLocationAdmins().subscribe({
                complete: () => {
/*                     console.info("Lista regionów pobrana."); */
                },
                next: (result: AdminDto[]) => {
                    resolve(result);
                },
                error: (error) => {
                    console.error("Nie udało się pobrać listy administratorów: ", error);
                    reject(error);
                }
            })
        })
    }
}