import { Injectable } from '@angular/core'
import { IkomfortApiConnectionService } from '../../Connections/ikomfort-api-connection.service'
import { DictSklepyRodzajDto } from '../../../dto/dictSklepyRodzajDto'

@Injectable({
    providedIn: 'root'
})

export class RDictSklepyRodzaj {
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(){
        return new Promise((resolve, reject) => {
            this.iKomfortApiConnectionService.getDictSklepyRodzaj().subscribe({
                complete: () => {
                    console.info("Lista rodzajów sklepów została pobrana.")
                },
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    console.error("Nie udało się pobrać listy rodzajów sklepów: ", error)
                }
            })
        })
    }
}