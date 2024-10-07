import { User } from "next-auth";

export interface IUser extends User{
    id:string ,
    name:string,
    email:string,
    password:string
    token?:string
}