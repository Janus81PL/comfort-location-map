export class NewAdminDto {
    constructor(
        public idDictSklepyLocationAdmin: number = 0,
        public idPracownika: number = 0,
        public active: boolean = true
    ){}
}