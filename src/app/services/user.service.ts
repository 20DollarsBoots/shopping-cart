import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService extends AbstractService<User> {

    constructor(protected http:HttpClient){
        super(http);
    }

    public getPath(){
        return "users";
    }

    public searchByName(name:string):Observable<Array<User>> {
        return this.http.post<Array<User>>(this.getUrl('search/name'), name);
    }

    public logar(user:User):Observable<User> {
        return this.http.post<User>(this.getUrl('signin'), user);
    }
}