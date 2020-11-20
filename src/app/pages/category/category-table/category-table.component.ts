import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';
import { Notifications } from 'src/app/utils/Notifications';
import { ToastService } from 'ng-uikit-pro-standard';

export interface PeriodicElement {
  name: string;
  id: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Ferramentas', description: 'Exemplo :Martelo, Furadeira'},
  {id: 2, name: 'Perfumaria', description: 'Exemplo: Perfumes, Desodorantes'},
  {id: 3, name: 'Escolar', description: 'Exemplo, Estojo, Caderno'},
  {id: 4, name: 'Alimentos', description: 'Exemplo: Bebidas, Comidas'},
  {id: 5, name: 'Telefonia', description: 'Exemplo: Carregador, Fone de Ouvido'},
 
];

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  providers:[
    CategoryService
  ]
})


export class CategoryTableComponent extends Notifications implements OnInit {
  public displayedColumns:any[] = ['id','name', 'description', 'actions'];
  public dataSource:MatTableDataSource<Category> = new MatTableDataSource(ELEMENT_DATA);
  public form:FormGroup = new FormGroup({
    pesquisar:new FormControl('')
  })
  constructor(private router:Router,private categoryService: CategoryService, public toast: ToastService) {
    super(toast);
  }

  ngOnInit() {
    this.categoryService.searchAll().subscribe((list)=>{
      this.dataSource = new MatTableDataSource(list);
    })
  }

  public new(){
    this.router.navigate(['categoria/mnt/0']);
  }

  public change(category:Category){
    this.router.navigate([`categoria/mnt/${category.id}`]);
  }

  public delete(category:Category){
    this.categoryService.delete(category.id).subscribe(()=>{
      this.showSuccess('Removido!');
      this.categoryService.searchAll();
      
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
