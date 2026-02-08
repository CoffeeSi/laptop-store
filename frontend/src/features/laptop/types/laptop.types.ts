import type { IBrand } from "@/features/brand/types/brand.types";

export interface ILaptopSpecifications {
    cpu: string,
    gpu: string,
    ram: number,
    storage: string,
}

export interface ILaptop {
    _id: string,
    model_name: string,
    price: number,
    brand_id: IBrand,
    specifications: ILaptopSpecifications,
    stock_quantity: number,
    imgUrl: string,
}

export interface ILaptopsResponse {
    laptops: ILaptop[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    laptopsPerPage: number;
}