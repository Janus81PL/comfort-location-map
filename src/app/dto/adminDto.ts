export class AdminDto {
    constructor(
        public idDictSklepyLocationAdmin: number = 0,
        public idPracownika: number = 0,
        public nazwisko: string = '',
        public imie: string = '',
        public active: boolean = true
    ){}
}