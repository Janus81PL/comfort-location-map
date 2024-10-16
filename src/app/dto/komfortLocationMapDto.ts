export class KomfortLocationMapDto {
    constructor(
        public idLocation: number = 0,
        public idSklep: number = 0,
        public idRegion: number = 0,
        public idDictSklepyTyp: number = 0,
        public idDictSklepyRodzaj: number = 0,
        public cx: number = 0,
        public cy: number = 0,
        public size: number = 0,
        public color: string = "",
        public address: string = ""
    ){}
}