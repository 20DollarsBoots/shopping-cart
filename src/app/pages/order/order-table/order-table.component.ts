import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Notifications } from 'src/app/utils/Notifications';

export interface PeriodicElement {
  user: object;
  id: number;
  requestedDate: string;
  total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, user: { name: 'Maria'}, requestedDate:'10/11/2020',total: '349,22'},
  {id: 2, user: { name: 'Maycon'}, requestedDate:'05/05/2020',total: '1.829,00'},
  {id: 3, user: { name: 'Jorge'}, requestedDate:'01/09/2020',total: '89,99'},
  {id: 4, user: { name: 'Ana Paula'}, requestedDate:'17/10/2020',total: '3.487,68'},]

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  providers: [
    OrderService
  ]
})
export class OrderTableComponent extends Notifications implements OnInit {

  public displayedColumns:any[] = ['id','user', 'requestedDate', 'total'];
  public dataSource:MatTableDataSource<any> = new MatTableDataSource(ELEMENT_DATA);
  
  constructor(private router:Router,private orderService: OrderService, public toast: ToastService) {
    super(toast);
  }

  ngOnInit() {
    this.orderService.searchAll().subscribe((list)=>{
      this.dataSource = new MatTableDataSource(list);
    })
  }

  public new(){
    this.router.navigate(['pedido/mnt/0']);
  }

  public change(order:Order){
    this.router.navigate([`pedido/mnt/${order.id}`]);
  }

  public delete(order:Order){
    this.orderService.delete(order.id).subscribe(()=>{
      this.showSuccess('Removido!');
      this.orderService.searchAll();
      
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
