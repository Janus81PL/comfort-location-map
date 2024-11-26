import { effect, Injectable, signal } from '@angular/core';
import { UserDto } from '../../dto/userDto';
import { UserRequestDto } from '../../dto/userRequestDto';
import { RUserLoginService } from '../DbCRUD/DbRead/RUserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private user = signal<UserDto | undefined>(undefined);
  private login = signal<string | undefined>(undefined);

  constructor(
    private rUserLoginService: RUserLoginService
  ) {}

  ngOnInit(): void {

  }

  logInUser(user: UserRequestDto){
    this.rUserLoginService.Get(user)
      .then((r) => {
        console.info("this.rUserLoginService.Get(user): ", r);
        this.setUser(r);
      })
      .catch((e) => {
        console.error("logInUser: ", e);
      })
  }

  logOutUser(){
    this.user.set(undefined);
    this.removeFromSessionStorage();
  }

  getUser() {
    return this.user();
  }

  setUser(user: UserDto){
    this.user.set(user);
    this.addToSessionStorage(user);
  }

  CheckSessionStorage() : void {
    const userJson = sessionStorage.getItem('iKomfortLocationUser');
    let plainObject

    if(userJson) {
      plainObject = JSON.parse(userJson);
      const user = Object.assign(new UserDto(), plainObject)
      this.setUser(user);
    }
  }

  addToSessionStorage(user: UserDto) : void{
    sessionStorage.setItem('iKomfortLocationUser', JSON.stringify(user));
  }

  removeFromSessionStorage() : void{
    const storedObject = sessionStorage.getItem('iKomfortLocationUser');

    if (storedObject)
      sessionStorage.removeItem('iKomfortLocationUser');
  }
}
