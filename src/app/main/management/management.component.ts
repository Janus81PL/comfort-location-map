import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminDto } from '../../dto/adminDto';
import { NewAdminDto } from '../../dto/newAdmintDto';
import { CDictSklepyLocationAdmin } from '../../Services/DbCRUD/DbCreate/CDictSklepyLocationAdmin';
import { RDictSklepyLocationAdmins } from '../../Services/DbCRUD/DbRead/RDictSklepyLocationAdmins';
import { UDictSklepyLocationAdmin } from '../../Services/DbCRUD/DbUpdate/UDictSklepyLocationAdmin';
import { AddNewAdminComponent } from '../Modals/add-new-admin/add-new-admin.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  public admins: AdminDto[] | undefined

  constructor(
    private rDictSklepyLocationAdmins: RDictSklepyLocationAdmins,
    private uDictSklepyLocationAdmin: UDictSklepyLocationAdmin,
    private cDictSklepyLocationAdmin: CDictSklepyLocationAdmin,

    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.ReloadData();
  }

  ShowAddAdminModal(): void{
    let dialogRef = this.dialog.open(AddNewAdminComponent, {
      height: '300px',
      width: '30%',
      position: {top: '10%', right: '35%'},
      data: new NewAdminDto()
    });

    dialogRef.afterClosed().subscribe(
      result => {

        console.info("result: ", result)

        if(result !== null){
          this.cDictSklepyLocationAdmin.Post(result)
            .then((r) => {
              console.info("this.cDictSklepyLocationAdmin.Post: ", r);
              this.ReloadData();
            })
            .catch((e) => {
              console.error("this.cDictSklepyLocationAdmin.Post: ", e)
            })
        }
      }
    )
  }

  ReloadData(): void{
    this.rDictSklepyLocationAdmins.Get()
      .then((r) => {
        this.admins = r;
      })
      .catch((e) => {
        
      })
  }

  RemovePermission(admin: AdminDto) : void{
    admin.active = !admin.active;

    this.uDictSklepyLocationAdmin.Post(admin)
      .then((r) => {
        this.ReloadData();
      })
      .catch((e) => {

      })
  }
}
