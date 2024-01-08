export interface TransferAmountRequest{

    amount: number;
    clientId : string;
    agentId : string;
    transferNotification : boolean;
    transferType : string;
    commissionType: string;
    
}