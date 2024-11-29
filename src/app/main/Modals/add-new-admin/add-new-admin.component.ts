import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NewAdminDto } from '../../../dto/newAdmintDto';
import { PracownikDto } from '../../../dto/pracownikDto';
import { RPracownicy } from '../../../Services/DbCRUD/DbRead/RPracownicy';

@Component({
  selector: 'app-add-new-admin',
  standalone: true,
  imports: [ MatDialogModule, FormsModule ],
  templateUrl: './add-new-admin.component.html',
  styleUrl: './add-new-admin.component.css'
})
export class AddNewAdminComponent {
  public employees: PracownikDto[] | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewAdminDto,
    public dialogRef: MatDialogRef<AddNewAdminComponent>,
    private rPracownicy: RPracownicy
  ){}

  ngOnInit(): void{
    this.ReloadData();
  }

  EmployeeChange(): void{

  }

  IsAdminSelected(): boolean{
    if(this.data.idPracownika != 0)
      return true

    return false;
  }

  ReloadData(){
    this.rPracownicy.Get()
      .then((r) => {
        this.employees = r;
      })
      .catch((e) => {
        console.error("ReloadData: ", e);
      })
  }
}
