import { Component, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header/header.component";
import { ManagementComponent } from "./main/management/management.component";

import { IKomfortConnectionService } from './Services/Connections/ikomfort-connection.service';

import { ActivatedRoute } from '@angular/router';
import { UserDto } from './dto/userDto';
import { UserManagementService } from './Services/Management/user-management.service';
import { GetUserData } from './Services/DbCRUD/DbRead/RUserData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private getUserData: GetUserData,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute
    ){}

  title = 'comfort-location-map';
  login = '';

  user!: UserDto;

  ngOnInit(): void {
      this.getUserData.Get()
        .then((r: UserDto) => {
          this.userManagementService.setUser(r)
          this.user = r;
        })
        //W przypadku braku połączenia ładowany jest użytkownik testowy!!!
        .catch((e: UserDto) => {
          this.userManagementService.setUser(e);
          this.user = e;
        });

    //Pobranie parametru z linku aplikacji:
    //http://localhost:4200/?login=%22pawelka%22

/*     this.route.queryParams.subscribe(params => {
      this.login = params['login'];
    }); */

  }
}
