import { Injectable } from '@angular/core';
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto'
import { SpinnerManagementService } from '../../Management/spinner-management.service';

@Injectable({
    providedIn: 'root'
})

export class GetShopLocations{
    constructor(
        private ikomfortApiConnectionService: IkomfortApiConnectionService,
        private spinnerManagementService: SpinnerManagementService
    ){}

    public Get(){
        return new Promise<KomfortLocationMapDto[]>((resolve, reject) => {
            this.spinnerManagementService.SpinnerOn()
            this.ikomfortApiConnectionService.getShopLocations().subscribe({
                complete: () => {
                    this.spinnerManagementService.SpinnerOff();
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