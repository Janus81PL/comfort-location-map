import { Component } from '@angular/core';
import { AdminDto } from '../../dto/adminDto';
import { RDictSklepyLocationAdmins } from '../../Services/DbCRUD/DbRead/RDictSklepyLocationAdmins';
import { UDictSklepyLocationAdmin } from '../../Services/DbCRUD/DbUpdate/UDictSklepyLocationAdmin';

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
    private uDictSklepyLocationAdmin: UDictSklepyLocationAdmin
  ){}

  ngOnInit(): void {
    this.ReloadData();
  }

  ShowAddAdminModal(){
    
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
