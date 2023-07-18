import {LocalDate} from "@js-joda/core";

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    team: string;
}

export interface Daily {
    id: number;
    date: LocalDate;
    user: User;
    yesterday: string;
    today: string;
    blockers: string;
}

export interface Team {
    id: number;
    name: string;
    members: User[];
}