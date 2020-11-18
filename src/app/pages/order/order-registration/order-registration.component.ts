import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-order-registration',
  templateUrl: './order-registration.component.html',
  styleUrls: ['./order-registration.component.scss'],
  providers: [
    OrderService,
    UserService,
  ]
})
export class OrderRegistrationComponent extends Notifications implements OnInit {

  public order: Order;
  public form:FormGroup;
  public users: User[] = []

  constructor(private router:Router, private route:ActivatedRoute,
    private orderService: OrderService, public toastrService: ToastService, private userService: UserService) {
    super(toastrService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      user:new FormControl(null,[Validators.required]), 
      requestedDate:new FormControl(null,[Validators.required]), 
      total: new FormControl(null,[Validators.required]), 
    });
    this.getUsers();
    this.route.params.subscribe((param) =>{
      if ( param ){
        this.order = param as Order;
        this.form.patchValue(this.order);
      }      
    })
  }

  public getUsers(){
    this.userService.searchAll().subscribe((list)=>{
      this.users = list;
    })
  }

  public compareUser(user1:User,user2:User){
    return user1 === user2 && user1.id == user2.id;
  }

  public cancel() {
    this.router.navigate([`pedido`]);
  }

  public save(){
    if (this.form.invalid){
      this.showAlert('Existem campos inválidos!');
      return;
    }
    this.order = this.form.value;
    this.orderService.save(this.order).subscribe((cat)=>{
      this.showSuccess('Salvo com sucesso!');
      this.router.navigate(['pedido']);
    }, err =>{
      this.showError('Deu erro, tente novamente', 'Atenção');
      console.error(err);
    });
  }

}
