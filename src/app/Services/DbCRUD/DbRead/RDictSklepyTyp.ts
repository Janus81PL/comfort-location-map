import { Injectable } from "@angular/core";
import { IkomfortApiConnectionService } from "../../Connections/ikomfort-api-connection.service";
import { DictSklepyTypDto } from "../../../dto/dictSklepyTypDto";

@Injectable({
    providedIn: 'root'
})

export class RDictSklepyTyp{
    constructor(
        private iKomfortApiConnectionService: IkomfortApiConnectionService
    ){}

    public Get(){
        return new Promise<DictSklepyTypDto[]>((resolve, reject) => {
            this.iKomfortApiConnectionService.getDictSklepyTyp().subscribe({
                complete: () => {
/*                     console.info("Lista typów sklepów pobrana.") */
                },
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    console.error("Nie udalo sie pobrać listy rodzajów sklepów: ", error);
                    reject(error)
                }
            })
        })
    }
}