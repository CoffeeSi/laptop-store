import * as z from "zod"
import { objectIdDTO } from "../../utils/validation.js"

export const createReviewDTO = z.object({


    rating : z.coerce.number().int().min(0).max(5),
    comment : z.string().trim().min(3).max(1000),
    laptop_id : objectIdDTO,

})