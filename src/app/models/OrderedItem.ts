
import { AbstractEntity } from './abstractentity';
import { Order } from './Order';
import { Product } from './Product';

export class OrderedItem extends AbstractEntity {
    
    public order:  Order;
    public product: Product;
    public unitPrice: number;
    public amount: number;
    public totalPrice: number;

}