import * as z from "zod"

const FilterParameters = z.object({

    brands : z.array(z.string()),
    cpu : z.array(z.string()),
    gpu : z.array(z.string())
    
})