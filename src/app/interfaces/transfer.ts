export interface Transfer {
    id?: string;
    reference?: string;
    transferAmount : number;
    transferType : string;
    transferReason: string;
    transferState?:string;
    commissionType:string;
    expirationDate?:Date;
    agentId:string;
    clientId:string;
    recipientId:string;
    transferNotification:boolean;
    otpCode?:string;
}
