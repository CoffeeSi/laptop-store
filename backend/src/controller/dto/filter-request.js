import { z } from "zod"

export const getLaptopsQuerySchema = z.object({
  brands: z.string().optional(),
  gpus: z.string().optional(),
  cpus: z.string().optional(),
  storage: z.string().optional(),

  page: z.string().optional().transform((val) => {
    if (!val) return 1
    const num = Number(val)
    if (!Number.isInteger(num) || num < 1) {
        throw new Error("Page must be a positive integer")
    }
    return num
}),

  ram: z.string().optional().transform((val) => {
    if (!val) return undefined
    try {
        const parsed = JSON.parse(val)
        return {
            min: parsed.min !== undefined ? Number(parsed.min) : undefined,
            max: parsed.max !== undefined ? Number(parsed.max) : undefined
        }
      } catch {
        throw new Error("Invalid RAM filter format")
      }
    })
})
