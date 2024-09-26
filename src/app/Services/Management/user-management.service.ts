import { effect, Injectable, signal } from '@angular/core';
import { UserDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private user = signal<UserDto | undefined>(undefined);

  constructor() { 
/*     effect(() => {
      console.info("Effect: ", this.user())
  }) */
  }

  getUser() {
    return this.user();
  }

  setUser(user: UserDto){
    this.user.set(user);
  }
}
