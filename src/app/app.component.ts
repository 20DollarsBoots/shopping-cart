import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  ]
})
export class AppComponent {
  title = 'shopping-cart';
  showFiller = false;

  showSidenav: boolean = true;

  constructor() {
  }

  ngOnInit() {
    const token = sessionStorage.getItem('user_token');
    if (token) {
      this.showSidenav = true;
    }

  }
  
}
