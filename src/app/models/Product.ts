import { AbstractEntity } from './abstractentity';
import { Category } from './Category';

export class Product extends AbstractEntity {
    
    public title: string;
    public description: string;
    public price: number;
    public category: Category;
    public imgUrl: string

}