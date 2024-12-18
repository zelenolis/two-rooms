export interface BookList {
    items: Booking[]
}

export interface Booking {
    team: string,
    time: number
}

export interface UserResponce {
    results: any[]
}

export interface LoginForm {
    email: string,
    pass: string
}