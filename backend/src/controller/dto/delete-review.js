import * as z from "zod"
import { objectIdDTO } from "../../utils/validation.js"


export const deleteReviewDTO = z.object({

    review_id : objectIdDTO,

})