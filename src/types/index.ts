export type Product = {
    id: string
    name: string
    description: string | null
    price: number
    image_url: string | null
    category_id: string | null
    is_active: boolean
    created_at: string
}

export type Category = {
    id: string
    name: string
    slug: string
    created_at: string
}

export type OrderStatus = 'recebido' | 'preparo' | 'entrega' | 'entregue' | 'cancelado'
export type PaymentMethod = 'pix' | 'card' | 'cash'

export type OrderItem = {
    productId: string
    name: string
    quantity: number
    price: number
}

export type Order = {
    id: string
    customer_id: string | null
    items: OrderItem[]
    total_price: number
    delivery_fee: number
    coupon_id: string | null
    status: OrderStatus
    payment_method: PaymentMethod
    observations: string | null
    created_at: string
}

export type Profile = {
    id: string
    name: string | null
    phone: string | null
    address: string | null
    neighborhood: string | null
    city: string
    created_at: string
}

export type Coupon = {
    id: string
    code: string
    discount_type: 'fixed' | 'percentage'
    value: number
    expires_at: string | null
    is_active: boolean
    created_at: string
}

export type DeliveryFee = {
    id: string
    neighborhood: string
    fee: number
    created_at: string
}

export interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
}

export interface StoreData {
    about: { history: string; photos: string[] };
    store: { address: string; location_url: string; photos: string[] };
    contact: { whatsapp: string; phone: string; instagram: string };
    products: Product[];
    blog: BlogPost[];
}

export interface CartItem extends Product {
    quantity: number;
}
