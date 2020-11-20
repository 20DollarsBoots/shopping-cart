import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Notifications } from 'src/app/utils/Notifications';

export interface PeriodicElement {
  name: string;
  id: number;
  price: string;
  category: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Alicate', price:'19,99',category: 'Ferramentas'},
  {id: 2, name: 'Martelo', price:'33,60',category: 'Ferramentas'},
  {id: 3, name: 'Perfume', price:'189,87',category: 'Perfumaria'},
  {id: 4, name: 'Caderno', price:'25,99',category: 'Escolar'},
  {id: 5, name: 'Coca-Cola', price:'7,80',category: 'Alimentos'},
  {id: 6, name: 'Estojo',  price:'10,00',category: 'Escolar'},
  {id: 7, name: 'Mochila',  price:'44,90',category: 'Escolar'},
  {id: 8, name: 'Carregador',  price:'38,50',category: 'Telefonia'},
  {id: 9, name: 'Capa para Celular',  price:'25,00',category: 'Telefonia'},
  {id: 10, name: 'Chocolate barra',  price:'14,99',category: 'Alimentos'},
];

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  providers: [
    ProductService
  ]
})
export class ProductTableComponent extends Notifications implements OnInit {

  public displayedColumns:any[] = ['id','name', 'price', 'category', 'actions'];
  public dataSource:MatTableDataSource<any> = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router:Router,private productService: ProductService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.productService.searchAll().subscribe((list)=>{
      this.dataSource = new MatTableDataSource(list);
    })
  }

  public new(){
    this.router.navigate(['produto/mnt/0']);
  }

  public change(product:Product){
    this.router.navigate([`produto/mnt/${product.id}`]);
  }

  public delete(product:Product){
    this.productService.delete(product.id).subscribe(()=>{
      this.showSuccess('Removido!');
      this.productService.searchAll();
      
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
