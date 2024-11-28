export class PracownikDto {
    constructor(
        public idPracownika: number = 0,
        public idRola: number = 0,
        public login: string = '',
        public nazwisko: string = '',
        public imie: string = '',
        public aktywny: number = 0
    ){}
}