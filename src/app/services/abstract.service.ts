import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment } from './../../environments/environment';
import { AbstractEntity } from '../models/abstractentity';

@Injectable()
export abstract class AbstractService<T extends AbstractEntity> {

    constructor(protected http:HttpClient){
    }

    public abstract getPath():string;

    public getUrl(pathEnd){
        return environment.url+'/'+this.getPath()+"/"+pathEnd;
    }

    public save(obj:T):Observable<T>{ 
        return this.http.post<T>(this.getUrl('save'), obj);
    }

    public delete(id:number):Observable<any>{ 
        return this.http.delete(this.getUrl(`${id}`));
    }

    public searchById(id:number):Observable<T> {
        return this.http.get<T>(this.getUrl(`${id}`));
    }

    public searchAll():Observable<Array<T>> {
        return this.http.get<Array<T>>(this.getUrl(``));
    }

}