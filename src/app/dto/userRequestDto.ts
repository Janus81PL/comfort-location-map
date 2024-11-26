export class UserRequestDto{
    constructor(
        public login: string = '',
        public password: string = ''
    ){}
}