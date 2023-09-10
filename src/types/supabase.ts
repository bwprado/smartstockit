export interface Product {
    id: string
    created_at: string
    name: string
    unit: string
    balance: number
    min: number
    max: number
    warning: boolean
    user: string
    type: "final" | "kit" | "raw"
    category: string
    barcode: string
    composition: string[]
}

export interface Profile {
    id: string
    name: string
    role: "admin" | "user"
    email: string
    user: string
}

export interface Unit {
    id: string
    created_at: string
    name: string
    acronym: string
    user: string
}

export interface Inventory {
    id: string
    created_at: string
    user: string
    amount: number
    expiration_date: string
    price: number
    product: string
}

export interface Customer {
    id: string
    created_at: string
    name: string
    address: JSON
    phone: string
    birthday: Date
    obs: string
    user: string
}

export interface User {
    id: string
    email: string
}

export interface Category {
    id: string
    created_at: string
    name: string
    ref: string
    user: string
}
