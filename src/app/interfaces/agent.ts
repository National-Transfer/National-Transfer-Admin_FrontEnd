import { Account } from "./account";
import { SalesPoint } from "./sales-point";

export interface Agent {

    id?: string;
    firstName: string;
    lastName : string;
    phoneNumber : string;
    email : string;
    salesPoint: SalesPoint;
    createdAt ?:Date;
    account ?: Account

}
