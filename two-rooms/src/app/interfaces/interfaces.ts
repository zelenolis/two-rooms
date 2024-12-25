export interface BookList {
    items: Booking[]
}

export interface Booking {
    objectId: string,
    team: string,
    time: string,
    date: string,
    duration: string,
    room: string
}

export interface UserResponce {
    results: any[]
}

export interface LoginForm {
    email: string,
    pass: string
}

export enum Rooms {
    any = "any",
    red = "red",
    yellow = "yellow"
}

export enum RepeatOptions {
    no = "no repeat",
    day = "day",
    week = "week"
}