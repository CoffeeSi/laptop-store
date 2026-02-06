import mongoose from "mongoose"
import * as z from "zod"
export const isValidEmail = (email) => email && email.includes("@")
export const isValidPhone = (phone) => /^\+\d{10,15}$/.test(phone)

export const objectIdDTO = z.string().regex(/^[0-9a-fA-F]{24}$/)