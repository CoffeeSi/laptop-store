import * as z from "zod"
import { objectIdDTO } from "../../utils/validation.js"

export const createLaptopDTO = z.object({

    model_name : z.string().min(2).max(100),
    price : z.coerce.number().int().nonnegative(), 
    specifications : z.array(z.object({cpu : z.string(), ram : z.number().int().nonnegative, storage : z.string(), gpu:z.string()})).min(1),
    stock_quantity : z.number().int().nonnegative(),
    brand_id : objectIdDTO

})