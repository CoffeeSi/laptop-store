import * as z from "zod"
import { objectIdDTO } from "../../utils/validation.js"

export const createUserDTO = z.object({

    full_name : z.string().min(2).max(30),
    email: z.email(),
    phone : z.string().regex(/^\+\d{10,15}$/),
    address : z.string()

})