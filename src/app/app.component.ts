import { Component, output, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header/header.component";
import { ManagementComponent } from "./main/management/management.component";
import { ActivatedRoute } from '@angular/router';
import { UserDto } from './dto/userDto';
import { UserManagementService } from './Services/Management/user-management.service';
import { GetUserData } from './Services/DbCRUD/DbRead/RUserData';
import { SpinnerManagementService } from './Services/Management/spinner-management.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public spinnerStatus: boolean = false;

  constructor(
    private getUserData: GetUserData,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private spinnerManagementService: SpinnerManagementService
    ){
      effect(() => {
        this.spinnerStatus = spinnerManagementService.GetSpinnerStatus();
      })
    }

  title = 'comfort-location-map';
  user!: UserDto;

  ngOnInit(): void {
    this.userManagementService.CheckSessionStorage();
  }

  SpinnerShow(): void {

  }

  SpinnerHide(){

  }
}
