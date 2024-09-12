import { Injectable } from '@angular/core';
import { UserDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor() { }

  user: UserDto | undefined;

  getUser() {
    return this.user;
  }

  setUser(user: UserDto){
    this.user = user;
  }
}
