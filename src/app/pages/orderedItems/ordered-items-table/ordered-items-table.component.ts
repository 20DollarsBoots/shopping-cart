import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { OrderedItem } from 'src/app/models/OrderedItem';
import { OrderedItemService } from 'src/app/services/orderedItems.service';
import { Notifications } from 'src/app/utils/Notifications';

export interface PeriodicElement {
  order: string;
  id: number;
  product: string;
  unitPrice:string;
  amount:number;
  totalPrice:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, order: '1456', product:'Martelo',unitPrice:'33,60',amount:6,totalPrice:'201,60' },
  {id: 2, order: '899', product: 'Perfume',unitPrice:'189,97',amount:1,totalPrice:'189,97'},
  {id: 3, order: '485', product: 'Capa para celular',unitPrice:'25,00',amount:4,totalPrice:'100,00' },]

@Component({
  selector: 'app-ordered-items-table',
  templateUrl: './ordered-items-table.component.html',
  styleUrls: ['./ordered-items-table.component.scss'],
  providers: [
    OrderedItemService
  ]
})
export class OrderedItemsTableComponent extends Notifications implements OnInit {

  
  public displayedColumns:any[] = 
  [
    'id',
    'order'  ,
    'product' ,
    'unitPrice' ,
    'amount' ,
    'totalPrice',
    'actions'
  ];
  public dataSource:MatTableDataSource<any> = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router:Router,private orderedItemService: OrderedItemService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.orderedItemService.searchAll().subscribe((list)=>{
      this.dataSource = new MatTableDataSource(list);
    })
  }

  public new(){
    this.router.navigate(['item-pedido/mnt/0']);
  }

  public change(orderedItem:OrderedItem){
    this.router.navigate([`item-pedido/mnt/${orderedItem.id}`]);
  }

  public delete(orderedItem:OrderedItem){
    this.orderedItemService.delete(orderedItem.id).subscribe(()=>{
      this.showSuccess('Removido!');
      this.orderedItemService.searchAll();
      
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
