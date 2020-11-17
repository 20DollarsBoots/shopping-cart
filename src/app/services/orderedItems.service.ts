import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { OrderedItem } from '../models/OrderedItem';

@Injectable()
export class OrderedItemService extends AbstractService<OrderedItem> {

    constructor(protected http:HttpClient){
        super(http);
    }

    public getPath(){
        return "ordered-items";
    }

}