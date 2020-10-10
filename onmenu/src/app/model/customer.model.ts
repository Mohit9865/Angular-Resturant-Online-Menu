import { Items } from '../model/item.model';


export interface CustomerInterFace{
    id : number;
    Name: string;
    email: string;
    order : Items[];
    total : number;
    // [
    //     {
    //         id:number;
    //         name:string;
    //         price:number;
    //     }
    // ]
}