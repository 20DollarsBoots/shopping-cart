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
  {id: 1, name: 'Hydrogen', description: 'H'},
  {id: 2, name: 'Helium', description: 'He'},
  {id: 3, name: 'Lithium', description: 'Li'},
  {id: 4, name: 'Beryllium', description: 'Be'},
  {id: 5, name: 'Boron', description: 'B'},
  {id: 6, name: 'Carbon',  description: 'C'},
  {id: 7, name: 'Nitrogen',  description: 'N'},
  {id: 8, name: 'Oxygen',  description: 'O'},
  {id: 9, name: 'Fluorine',  description: 'F'},
  {id: 10, name: 'Neon',  description: 'Ne'},
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
