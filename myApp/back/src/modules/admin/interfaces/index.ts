export interface IAdminLoginRegister {
    login : string,
    password : string
}

export interface IChangeItem {
    price : number
    oldPrice : number
}


export interface IAddItem {
    name : string,
    price : number,
    img : string,
    category : string
}
