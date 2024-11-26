export class UserDto {
    constructor(
        public idPracownika: number = 0,
        public login: string = '',
        public imie: string = '',
        public nazwisko: string = '',
        public rola: number = 0,
        public email :string = '',
        public isKomfortLocationsAdmin: boolean = false,
        public token: string = '',
        public aktywny: number = 0
    ){}
}