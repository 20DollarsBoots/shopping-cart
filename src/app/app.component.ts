import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    LoginComponent, 
    UserService
  ]
})
export class AppComponent {
  title = 'shopping-cart';
  showFiller = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  showSidenav: boolean = true;

  constructor(private auth: LoginComponent) {

  }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(
      (show: boolean) => this.showSidenav = show
    )
  }
  
}
