import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Notifications } from 'src/app/utils/Notifications';

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
  public dataSource:MatTableDataSource<any> = new MatTableDataSource();

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
