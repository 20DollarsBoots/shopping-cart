import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  providers: [ 
    UserService
  ]
})
export class UserTableComponent extends Notifications implements OnInit {

  public displayedColumns:any[] = 
  [
    'id',
    'name',
    'email',
    'cpf',
    'zipCode',
    'state',
    'city',
    'place',
    'neighborhood',
    'complement',
    'number', 
    'actions'
  ];
  public dataSource:MatTableDataSource<any> = new MatTableDataSource();


  constructor(private router:Router,private userService: UserService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.userService.searchAll().subscribe((list)=>{
      this.dataSource = new MatTableDataSource(list);
    })
  }

  public new(){
    this.router.navigate(['usuario/mnt/0']);
  }

  public change(user:User){
    this.router.navigate([`usuario/mnt/${user.id}`]);
  }

  public delete(user:User){
    this.userService.delete(user.id).subscribe(()=>{
      this.showSuccess('Removido!');
      this.userService.searchAll();
      
    }, err =>{
      this.showError('Falha ao Excluir', err);
      console.log('Falha ao Excluir', err);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
