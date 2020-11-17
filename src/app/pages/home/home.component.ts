import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    ProductService
  ]
})
export class HomeComponent extends Notifications implements OnInit {

  products = [ 
    {
      title: 'string',
      description: 'string',
      price: 1,
      imgUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      title: 'string',
      description: 'string',
      price: 1,
      imgUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      title: 'string',
      description: 'string',
      price: 1,
      imgUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }
    ];

  constructor(private productService: ProductService, private toast: ToastService) {
    super(toast);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.searchAll().subscribe(list => {
      this.products = list
    })
  }

  public buy(product: Product) {

    this.showSuccess(product.title, 'Comprou');

  }

}
