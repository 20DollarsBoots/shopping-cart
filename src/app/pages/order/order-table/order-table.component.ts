import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  providers: [
    OrderService,
  ]
})
export class OrderTableComponent extends Notifications implements OnInit {

  public displayedColumns:any[] = ['id','user', 'requestedDate', 'total'];
  public dataSource:MatTableDataSource<Order> = new MatTableDataSource();
  
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
