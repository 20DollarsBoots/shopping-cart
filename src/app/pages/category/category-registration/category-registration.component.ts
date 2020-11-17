import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';import { ToastService } from 'ng-uikit-pro-standard';
;
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-category-registration',
  templateUrl: './category-registration.component.html',
  styleUrls: ['./category-registration.component.scss'],
  providers: [
    CategoryService
  ]
})
export class CategoryRegistrationComponent extends Notifications implements OnInit {

  public category:Category;
  public form:FormGroup;

  constructor(private router:Router, private route:ActivatedRoute,
    private categoryService:CategoryService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name:new FormControl(null,[Validators.required]), 
      description:new FormControl() 
    });
    this.route.params.subscribe((param) =>{
      if ( param ){
        this.category = param as Category;
        this.form.patchValue(this.category);
      }      
    })
  }

  public cancel() {
    this.router.navigate([`categoria`]);
  }

  public save(){
    if (this.form.invalid){
      this.showAlert('Existem campos inválidos!');
      return;
    }
    this.category = this.form.value;
    this.categoryService.save(this.category).subscribe((cat)=>{
      this.showSuccess('Salvo com sucesso!');
      this.router.navigate(['categoria']);
    }, err =>{
      this.showError('Deu erro, tente novamente', 'Atenção');
      console.error(err);
    });
  }
}
