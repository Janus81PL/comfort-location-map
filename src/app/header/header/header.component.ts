import { Component, Input } from '@angular/core';
import { UserDto } from '../../dto/userDto';
import { LogInUserComponent } from '../../main/Modals/log-in-user/log-in-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestDto } from '../../dto/userRequestDto';
import { UserManagementService } from '../../Services/Management/user-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() userData : UserDto | undefined;

  constructor(
    public dialog: MatDialog,
    public userManagementService: UserManagementService
  ){}

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

  RedirectToIKomfort(){
    window.location.replace('https://intranet.komfort.pl/');
  }
}
