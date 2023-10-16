export interface IGetCategory {
    category: string
}

export interface IAuthToken {
    token: string
}

export interface IRefreshToken {
    refreshToken: string
}

export interface IAuthTokenContent {
    id: number;
    name: string;
    email: string;
    role: any;
}