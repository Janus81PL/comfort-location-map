import { Component } from '@angular/core';
import { AdminDto } from '../../dto/adminDto';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  public admins: AdminDto[] | undefined

  constructor(){}

  ngOnInit(): void {

  }
}
