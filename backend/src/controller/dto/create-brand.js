import * as z from "zod"

export const createBrandDTO = z.object({

    brand_name : z.string().min(2).max(50),
    country : z.string().min(2).max(50)

})