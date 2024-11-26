import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { KomfortLocationMapDto } from '../../../dto/komfortLocationMapDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-store-location',
  standalone: true,
  imports: [ MatDialogModule, FormsModule ],
  templateUrl: './edit-store-location.component.html',
  styleUrl: './edit-store-location.component.css',

  template: 'passed in {{KomfortLocationMapDto}}'
})
export class EditStoreLocationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: KomfortLocationMapDto,
    public dialogRef: MatDialogRef<EditStoreLocationComponent>
  ){}

  ngOnInit(): void{

  }

  ChangeColor(): void {

  }
}
