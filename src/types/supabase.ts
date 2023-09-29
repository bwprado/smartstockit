export interface Product {
    id?: string
    created_at?: string
    name: string
    unit: Unit
    balance: number
    min: number | string
    max: number | string
    price?: number
    cost?: number
    user?: string
    type: "product" | "kit" | "raw"
    category: Category
    barcode: string
    composition: { name: string; id: string; amount: number }[]
    supplier: Supplier
    brand: Brand
    units?: Unit
    brands?: Brand
    categories?: Category
    suppliers?: Supplier
}

type CompositionForm = { value: string; label: string; amount: number }[]
type SupplierForm = { value: string; label: string }
type BrandForm = { value: string; label: string }
type CategoryForm = { value: string; label: string }
type UnitForm = { name: string; id: string }

export type ProductForm = Omit<
    Product,
    "composition" | "supplier" | "brand" | "category" | "unit"
> & {
    composition: CompositionForm
    supplier: SupplierForm
    brand: BrandForm
    category: CategoryForm
    unit: UnitForm
}

export interface Profile {
    id: string
    name: string
    role: "admin" | "user"
    email: string
    user: string
    company: string
    company_code: number
    image: string
    phone: number
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
    productName?: string
}

export interface Customer {
    id: string
    created_at: string
    email: string
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

export interface Brand {
    id: string
    created_at: string
    name: string
    user: string
}

export interface Supplier {
    id: string
    created_at: string
    name: string
    address: JSON
    phone: string
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
