import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-app-info',
  standalone: true,
  imports: [ MatDialogModule, FormsModule ],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.css'
})
export class AppInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: null,
  ){}
}
