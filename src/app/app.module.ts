import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRegistrationComponent } from './pages/product/product-registration/product-registration.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { SmartContainerComponent } from './components/smart-container/smart-container.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryTableComponent } from './pages/category/category-table/category-table.component'
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/tokenInterceptor';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AboutComponent } from './pages/about/about.component';
import { CategoryRegistrationComponent } from './pages/category/category-registration/category-registration.component';
import { ToastModule } from 'ng-uikit-pro-standard';
import { ProductTableComponent } from './pages/product/product-table/product-table.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { UserRegistrationComponent } from './pages/user/user-registration/user-registration.component';
import { OrderTableComponent } from './pages/order/order-table/order-table.component';
import { OrderRegistrationComponent } from './pages/order/order-registration/order-registration.component';
import { OrderedItemsTableComponent } from './pages/orderedItems/ordered-items-table/ordered-items-table.component';
import { OrderedItemsRegistrationComponent } from './pages/orderedItems/ordered-items-registration/ordered-items-registration.component';
import { LoginComponent } from './pages/login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { Error404Component } from './pages/error/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductRegistrationComponent,
    HomeComponent,
    SmartContainerComponent,
    CategoryTableComponent,
    AboutComponent,
    CategoryRegistrationComponent,
    ProductTableComponent,
    UserTableComponent,
    UserRegistrationComponent,
    OrderTableComponent,
    OrderRegistrationComponent,
    OrderedItemsTableComponent,
    OrderedItemsRegistrationComponent,
    LoginComponent,
    Error404Component,
  ],
  imports: [
    MatGridListModule,
    MatTooltipModule,
    ToastModule.forRoot(),
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, deps: [Router]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
