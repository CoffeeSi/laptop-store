
export interface IOrder {
    user_id: string | null,
    items: IOrderItem[],
    total_price: number,
    status: string,
    order_date: Date
}

export interface IOrderItem {
    laptop_id: string,
    quantity: number,
    unit_price: number
}

export interface IOrderSubmit {
    user_id: string | null,
    items: IOrderItem[],
    total_price: number
}