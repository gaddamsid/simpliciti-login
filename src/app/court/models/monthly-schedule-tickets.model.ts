export interface MonthlyScheduleTickets {
    roomTypeDescription: string;
    scheduleHearingDate: string;
    ticketsAssigned: number;
    totalTickets: number;

    // frontend fields
    selected: boolean;
    weeklyScheduleTickets: WeeklyScheduleTickets[];
}

export interface WeeklyScheduleTickets {
    roomTypeDescription: string;
    scheduleHearingDate: string;
    ticketsAssigned: number;
    totalTickets: number;
    courtSchedulesID?: number;
    citationNumber: string;
}

export interface TicketSlot {
    courtSchedulesID?: any;
    citationId: any;


    //  frontend fields
    citationNumber: string;
    isSelected: boolean;
    slotTime: string;
}