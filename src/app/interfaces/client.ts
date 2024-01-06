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
    nationality : string;
    countryOfAddress :string;
    city : string;
    phoneNumber : string;
    email :string;
    accountResponseDto ?: Account;
    
}