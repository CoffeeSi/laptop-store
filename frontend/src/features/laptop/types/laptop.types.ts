export interface ILaptop {
    _id: number,
    model_name: string,
    price: number,
    brand: string,
    specifications: [{
        cpu: string,
        gpu: string,
        ram: string,
        storage: string,
    }],
    stock_quantity: number,
    imgUrl: string,
}