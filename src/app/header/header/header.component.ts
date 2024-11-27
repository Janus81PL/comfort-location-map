import { Component, effect, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { UserDto } from '../../dto/userDto';
import { LogInUserComponent } from '../../main/Modals/log-in-user/log-in-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestDto } from '../../dto/userRequestDto';
import { UserManagementService } from '../../Services/Management/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() userData : UserDto | undefined;

  constructor(
    public dialog: MatDialog,
    public userManagementService: UserManagementService,
    private router: Router
  ){
    effect(() => {
      this.userData = this.userManagementService.getUser();
    })
  }

  ShowLoginModal(){
    let dialogRef = this.dialog.open(LogInUserComponent, {
      height: '300px',
      width: '30%',
      position: {top: '10%', left: '35%'},
      data: new UserRequestDto()
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result !== null){
          this.userManagementService.logInUser(result);
        }
      }
    )
  }

  Logout(){
    this.userManagementService.logOutUser();
    this.router.navigate(['/location-map']);
  }

  RedirectToIKomfort(){
    window.location.replace('https://intranet.komfort.pl/');
  }
}
