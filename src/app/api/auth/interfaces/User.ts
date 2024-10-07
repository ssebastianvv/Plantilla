import { User } from "next-auth";

export interface IUser extends User {
    _id: string;
    username: string; 
    id: string;
    name: string;
    email: string;
    password: string;
    token: string; 
    accessToken: string; 
}
