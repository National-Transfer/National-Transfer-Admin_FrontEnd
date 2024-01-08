import { Account } from "./account";
import { SalesPoint } from "./sales-point";

export interface Agent {

    id?: string;
    firstName: string;
    lastName : string;
    phoneNumber : string;
    email : string;
    salesPoint ?: SalesPoint;
    salesPointId ?: string;
    createdAt :Date;
    account ?: Account

}
