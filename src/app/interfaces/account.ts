export interface Account {
    accountCode?: string;
    balance:number ;
    ownerId:string;
    annualAmountTransfer : number;
    createdAt  : Date ;
    accountType : string;
}
