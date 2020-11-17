
import { AbstractEntity } from './abstractentity';

export class User extends AbstractEntity {
    
    public name: string;
    public email: string;
    public cpf: string;
    public password: string;
    public token: string;
    public zipCode: String;
    public state: String;
    public city: String;
    public place: String;
    public neighborhood: String;
    public complement: String;
    public number: String;

}