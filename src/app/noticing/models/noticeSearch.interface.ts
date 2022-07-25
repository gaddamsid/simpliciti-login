//Request
export interface NoticeSearch{
    noticeName : string;
    dateMailed : string;
    dateGenerated : string;
    sequenceNumber : number;
    citationNumberOrTicketNumber : string;
    statePlate : string;
    driverSearchLicense : string;
    noticeTypeId : number;
    noticeDate : string;
}

//Response
export interface NoticeTable {
    noticeID: number;
    noticeTypeID: number;
    noticeType: number;
    noticeTypeLongName: string;
    dateSent: string;
    batchNumber: number;
    status: string;
    fileTransfer: string | null;
    sequenceNumber: number;
    ticketcount: number;
    noticeCount: number;
    pageCount: number;
    amtDue: number; 
}

//NoticeTypeList
export interface NoticeType
{
    noticeTypeID : number;
    noticeTypeLongName : string;
}

