export interface Signup {
    name : string,
    password : string,
    email : string
}

export interface login {
    email : string,
    password : string
}

export interface product {
    id : number,
    name : string,
    price : number,
    category : string,
    color: string,
    description : string,
    url: string,
    quantity : undefined | number
}

export interface cart {
    id : number | undefined,
    name : string,
    price : number,
    category : string,
    color: string,
    description : string,
    url: string,
    quantity : undefined | number,
    userId : any,
    productId : number
}