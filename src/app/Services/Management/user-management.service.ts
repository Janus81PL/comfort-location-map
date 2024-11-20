import { effect, Injectable, signal } from '@angular/core';
import { UserDto } from '../../dto/userDto';
import { UserRequestDto } from '../../dto/userRequestDto';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private user = signal<UserDto | undefined>(undefined);
  private login = signal<string | undefined>(undefined);

  constructor(
  ) { 

  }

  logInUser(user: UserRequestDto){
    
  }

  logOutUser(){

  }

  getUser() {
    return this.user();
  }

  setUser(user: UserDto){
    this.user.set(user);
  }
}
