export interface IAdminBrand {
    _id: string;
    brand_name: string;
    country: string;
}

export interface ICreateBrandPayload {
    brand_name: string;
    country: string;
}

export interface ILaptopSpecifications {
    cpu: string;
    ram: number;
    storage: string;
    gpu: string;
}

export interface IAdminLaptop {
    _id: string;
    model_name: string;
    price: number;
    specifications: ILaptopSpecifications;
    stock_quantity: number;
    brand_id: string | { _id: string; brand_name: string };
}

export interface ICreateLaptopPayload {
    model_name: string;
    price: number;
    specifications: ILaptopSpecifications[];
    stock_quantity: number;
    brand_id: string;
}

export interface IAdminOrder {
    _id: string;
    user_id: {
        _id: string;
        full_name: string;
        email: string;
    } | null;
    order_date: string;
    status: 'pending' | 'shipping' | 'delievered';
    total_price: number;
    items: Array<{
        laptop_id: {
            _id: string;
            model_name: string;
        };
        quantity: number;
        unit_price: number;
    }>;
}

export interface IUpdateOrderStatusPayload {
    status: 'pending' | 'shipping' | 'delievered';
}
