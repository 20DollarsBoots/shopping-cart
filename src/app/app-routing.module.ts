import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';    
import { AboutComponent } from './pages/about/about.component';;
import { HomeComponent } from './pages/home/home.component';
import { CategoryTableComponent } from './pages/category/category-table/category-table.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { CategoryRegistrationComponent } from './pages/category/category-registration/category-registration.component';
import { ProductTableComponent } from './pages/product/product-table/product-table.component';
import { ProductRegistrationComponent } from './pages/product/product-registration/product-registration.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { UserRegistrationComponent } from './pages/user/user-registration/user-registration.component';
import { OrderTableComponent } from './pages/order/order-table/order-table.component';
import { OrderRegistrationComponent } from './pages/order/order-registration/order-registration.component';
import { OrderedItemsTableComponent } from './pages/orderedItems/ordered-items-table/ordered-items-table.component';
import { OrderedItemsRegistrationComponent } from './pages/orderedItems/ordered-items-registration/ordered-items-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error/error404/error404.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'sobre',
    component: AboutComponent
  },
  {
    path:'tutorial',
    component: TutorialComponent
  },
  {
    path:'categoria',
    component: CategoryTableComponent
  },
  {
    path:'produto',
    component: ProductTableComponent
  },
  {
    path:'produto/mnt/:id',
    component: ProductRegistrationComponent
  },
  {
    path:'categoria/mnt/:id',
    component: CategoryRegistrationComponent
  },
  {
    path:'usuario',
    component: UserTableComponent
  },
  {
    path:'usuario/mnt/:id',
    component: UserRegistrationComponent
  },
  {
    path:'pedido',
    component: OrderTableComponent
  },
  {
    path:'pedido/mnt/:id',
    component: OrderRegistrationComponent
  },
  {
    path:'item-pedido',
    component: OrderedItemsTableComponent
  },
  {
    path:'item-pedido/mnt/:id',
    component: OrderedItemsRegistrationComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'carrinho',
    component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
