import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.scss'],
  providers: [
    ProductService,
    CategoryService,
  ]
})
export class ProductRegistrationComponent extends Notifications implements OnInit {

  public product: Product;
  public form:FormGroup;
  public categories:Category[] = [];


  constructor(private router:Router, private route:ActivatedRoute,
    private productService: ProductService, private categoryService: CategoryService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      title:new FormControl(null,[Validators.required]), 
      description:new FormControl(null,[Validators.required]), 
      price:new FormControl(null,[Validators.required]), 
      category:new FormControl(null,[Validators.required]), 
      imgUrl:new FormControl(), 
    });
    this.getCategories();
    this.route.params.subscribe((param) =>{
      if ( param ){
        this.productService.searchById(param.id).subscribe((prod: Product) => {
          this.form.patchValue(prod);
        })
      }      
    })
  }

  public getCategories(){
    this.categoryService.searchAll().subscribe((list)=>{
      this.categories = list;
    })
  }
  
  public compareCategory(cat1:Category,cat2:Category){
    return cat1 === cat2 && cat1.id == cat2.id;
  }

  public cancel() {
    this.router.navigate([`produto`]);
  }

  public save(){
    if (this.form.invalid){
      this.showAlert('Existem campos inválidos!');
      return;
    }
    this.product = this.form.value;
    this.productService.save(this.product).subscribe((cat)=>{
      this.showSuccess('Salvo com sucesso!');
      this.router.navigate(['produto']);
    }, err =>{
      this.showError('Deu erro, tente novamente', 'Atenção');
      console.error(err);
    });
  }

}
