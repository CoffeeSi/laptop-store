import type { IBrand } from "@/features/brand/types/brand.types";

export interface ILaptop {
    _id: string,
    model_name: string,
    price: number,
    brand_id: IBrand,
    specifications: [{
        cpu: string,
        gpu: string,
        ram: string,
        storage: string,
    }],
    stock_quantity: number,
    imgUrl: string,
}