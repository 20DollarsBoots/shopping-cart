import { AbstractEntity } from './abstractentity';
import { User } from './User';

export class Order extends AbstractEntity {
    
    public user: User;
    public requestedDate: Date;
    public total: number;
}