import { Account } from "./account";

export interface Client {

    id ?:string;
    title ?:string;
    firstName :string;
    identityType :string;
    countryOfIssue :string;
    identityNumber :string;
    dateOfBirth :Date;
    profession : string;
    identityValidity:Date;
    nationality : string;
    countryOfAddress :string;
    address: string;
    city : string;
    phoneNumber : string;
    email :string;
    account ?: Account;
    createdTime ?: Date;
    lastUpdatedTime ?: Date;

    
}