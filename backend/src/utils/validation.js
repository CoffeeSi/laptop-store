import mongoose from "mongoose"
export const isValidEmail = (email) => email && email.includes("@")
export const isValidPhone = (phone) => /^\+\d{10,15}$/.test(phone)
export const validateLaptopData = (data) => {

    const {model_name, price, specifications, stock_quantity, brand_id} = data

    if (!model_name || price == undefined || price < 0 || !brand_id) return false

    if(!Array.isArray(specifications) || specifications.length === 0 )return false

    if (stock_quantity == undefined || stock_quantity < 0) return false

    if (!mongoose.Types.ObjectId.isValid(brand_id)) return false;
    return true
}