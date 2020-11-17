import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/usuario.service';
import { Notifications } from 'src/app/utils/Notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    UserService,
  ]
})
export class LoginComponent extends Notifications implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })
  constructor(private router: Router, private userService: UserService, private toast: ToastService) {
    super(toast);
  }

  isAuthenticated = new EventEmitter<boolean>();

  ngOnInit() {
  }

  public logar() {
    if (this.form.invalid) {
      this.showAlert('Informe os dados nos campos!');
      return;
    }

    const user: User = this.form.value;
    this.userService.logar(user).subscribe((user) => {
      if (user) {
        const { password, ...newUser } = user; 
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('user_token', user.token);
        this.isAuthenticated.emit(true);
        this.router.navigate(['home']);
      } else {
        this.isAuthenticated.emit(true);

      }
    })
  }

}
