import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [
    UserService,
  ]
})
export class UserRegistrationComponent extends Notifications implements OnInit {

  public user: User;
  public form:FormGroup;

  constructor(private router:Router, private route:ActivatedRoute,
    private userService:UserService, public toastrService: ToastService) {
    super(toastrService);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      cpf: new FormControl(null,[Validators.required]),
      zipCode: new FormControl(null,[Validators.required]),
      state: new FormControl(null,[Validators.required]),
      city: new FormControl(null,[Validators.required]),
      place: new FormControl(null,[Validators.required]),
      neighborhood: new FormControl(null,[Validators.required]),
      complement: new FormControl(),
      number: new FormControl(null,[Validators.required]),
    });
    this.route.params.subscribe((param) =>{
      if ( param ){
        this.route.params.subscribe((param) =>{
          if ( param ){
            this.userService.searchById(param.id).subscribe((user: User) => {
              this.form.patchValue(user);
            })
          }      
        })
      }      
    })
  }

  public cancel() {
    this.router.navigate([`usuario`]);
  }

  public save(){
    if (this.form.invalid){
      this.showAlert('Existem campos inválidos!');
      return;
    }
    this.user = this.form.value;
    this.userService.save(this.user).subscribe((cat)=>{
      this.showSuccess('Salvo com sucesso!');
      this.router.navigate(['categoria']);
    }, err =>{
      this.showError('Deu erro, tente novamente', 'Atenção');
      console.error(err);
    });
  }
}
