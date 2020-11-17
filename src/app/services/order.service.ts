import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable()
export class OrderService extends AbstractService<Order> {

    constructor(protected http:HttpClient){
        super(http);
    }

    public getPath(){
        return "orders";
    }

}