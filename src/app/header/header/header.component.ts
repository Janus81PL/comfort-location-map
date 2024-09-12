import { Component, Input, effect } from '@angular/core';
import { UserDto } from '../../dto/userDto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() userData : UserDto | undefined;

  RedirectToIKomfort(){
    window.location.replace('https://intranet.komfort.pl/');
  }
}
