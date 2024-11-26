import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserRequestDto } from '../../../dto/userRequestDto';

@Component({
  selector: 'app-log-in-user',
  standalone: true,
  imports: [ MatDialogModule, FormsModule ],
  templateUrl: './log-in-user.component.html',
  styleUrl: './log-in-user.component.css'
})
export class LogInUserComponent {
  correct: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserRequestDto,
    public dialogRef: MatDialogRef<LogInUserComponent>
  ){}

  ngOnInit(): void{
    this.TestRun();
  }

  TestRun(){
    if(this.data.login.length > 0 && this.data.password.length > 0){
      this.correct = true;
    } else {
      this.correct = false;
    }
  }
}
