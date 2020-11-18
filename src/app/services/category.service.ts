import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable()
export class CategoryService extends AbstractService<Category> {

    constructor(protected http:HttpClient){
        super(http);
    }

    public getPath(){
        return "categories";
    }

    public searchByName(name:string):Observable<Array<Category>> {
        return this.http.post<Array<Category>>(this.getUrl('search/name'), name);
    }

}