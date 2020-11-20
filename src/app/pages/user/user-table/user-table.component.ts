import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Notifications } from 'src/app/utils/Notifications';

export interface PeriodicElement {
  id:number;
  name:string;
  email:string;
  cpf:string;
  zipCode:string;
  state:string;
  city:string;
  place:string;
  neighborhood:string;
  complement:string;
  number:number; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Pedro', email:'Pedro@hotmail.com',cpf: '189.126.458-09',zipCode:'85460-000',state:'PR',city:'Quedas do Iguaçu',place:'rua tarumã',neighborhood:'vila dias',complement:'casa',number:27},
  {id: 2, name: 'João', email:'Joao@hotmail.com',cpf: '226.979.225-15',zipCode:'04546-001',state:'SP',city:'São Paulo',place:'av Brasil',neighborhood:'Centro',complement:'ap 405',number:772},
  {id: 3, name: 'Marcos', email:'Marcos@hotmail.com',cpf: '515.654.983-11',zipCode:'01333-010',state:'RJ',city:'Paraty',place:'av atlântico',neighborhood:'Vila Lobos',complement:'sítio',number:0},
  
];

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
  public dataSource:MatTableDataSource<any> = new MatTableDataSource(ELEMENT_DATA);


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
