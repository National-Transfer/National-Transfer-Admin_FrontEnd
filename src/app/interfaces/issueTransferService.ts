export interface IssueTransferRequest {

    agentId : string;
    phone : string;
    clientId : string;
    amount : number;
    reason: string;
    transferNotification: boolean;
    recipientId : string;
    transferType : string;
    commissionType : string;

}