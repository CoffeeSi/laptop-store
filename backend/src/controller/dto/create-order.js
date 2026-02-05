import * as z from "zod"
import { objectIdDTO } from "../../utils/validation.js"

export const createOrderDTO = z.object({

    items : z.array(z.object({laptop_id : objectIdDTO, quantity : z.number().int().positive()})).min(1)

})