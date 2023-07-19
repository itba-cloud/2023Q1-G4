export interface Daily {
    _date: Date;
    email: string;
    yesterday: string;
    today: string;
    blocker: string;
    team_id: number;
}

export interface DailyToDisplay extends Daily {
    id: number;
}

export interface Team {
    id: number;
    name: string;
}

export enum Role {
    PM = 'PM',
    DEV = 'DEV',
}

export interface BlockerNotification {
    subject: string;
    message: string;
}