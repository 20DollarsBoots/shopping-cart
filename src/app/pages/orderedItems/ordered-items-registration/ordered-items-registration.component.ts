import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Order } from 'src/app/models/Order';
import { OrderedItem } from 'src/app/models/OrderedItem';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { OrderedItemService } from 'src/app/services/orderedItems.service';
import { ProductService } from 'src/app/services/product.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-ordered-items-registration',
  templateUrl: './ordered-items-registration.component.html',
  styleUrls: ['./ordered-items-registration.component.scss'],
  providers: [
    OrderedItemService,
    OrderService,
    ProductService,
  ]
})
export class OrderedItemsRegistrationComponent extends Notifications implements OnInit {
  public orderedItem: OrderedItem;
  public form:FormGroup;
  public orders: Order[] = [];
  public products: Product[] = []

  constructor(private router:Router, private route:ActivatedRoute,
    private orderService: OrderService, public toastrService: ToastService, private orderedService: OrderedItemService, 
    private productService: ProductService) {
    super(toastrService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      order:new FormControl(null,[Validators.required]), 
      product:new FormControl(null,[Validators.required]), 
      unitPrice: new FormControl(null,[Validators.required]), 
      amount: new FormControl(null,[Validators.required]), 
      totalPrice: new FormControl(null,[Validators.required]), 
    });
    this.getOrders();
    this.getProducts();
    this.route.params.subscribe((param) =>{
      if ( param ){
        this.orderedItem = param as OrderedItem;
        this.form.patchValue(this.orderedItem);
      }      
    })
  }

  public getOrders(){
    this.orderService.searchAll().subscribe((list)=>{
      this.orders = list;
    })
  }

  public compareOrder(order1:Order,order2:Order){
    return order1 === order2 && order1.id == order2.id;
  }

  public getProducts(){
    this.productService.searchAll().subscribe((list)=>{
      this.products = list;
    })
  }

  public compareProduct(prod1:Product,prod2:Product){
    return prod1 === prod2 && prod1.id == prod2.id;
  }

  public cancel() {
    this.router.navigate([`item-pedido`]);
  }

  public save(){
    if (this.form.invalid){
      this.showAlert('Existem campos inválidos!');
      return;
    }
    this.orderedItem = this.form.value;
    this.orderedService.save(this.orderedItem).subscribe((cat)=>{
      this.showSuccess('Salvo com sucesso!');
      this.router.navigate(['pedido']);
    }, err =>{
      this.showError('Deu erro, tente novamente', 'Atenção');
      console.error(err);
    });
  }
}
