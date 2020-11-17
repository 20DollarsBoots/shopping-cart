import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable()
export class ProductService extends AbstractService<Product> {

    constructor(protected http:HttpClient){
        super(http);
    }

    public getPath(){
        return "products";
    }

    public searchByName(name:string):Observable<Array<Product>> {
        return this.http.post<Array<Product>>(this.getUrl('search-by-name'), name);
    }

}