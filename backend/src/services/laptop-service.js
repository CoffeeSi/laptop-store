import mongoose from "mongoose"
import Laptop from "../model/laptop-model.js"
import { validateLaptopData } from "../utils/validation.js"

export const createLaptop = async(dataSet)=>{

    const isValid = validateLaptopData(dataSet)
    if (!isValid){throw new Error("bad data")}
    const {model_name, price, specifications, stock_quantity, brand_id} = dataSet
    

    const newLaptop = new Laptop({model_name, price, specifications, stock_quantity, brand_id})

    await newLaptop.save()
    return newLaptop
}


export const removeLaptop = async(dataSet) =>{

    const id = dataSet
    const deletedLaptop = await Laptop.findByIdAndDelete(id);
    if (!deletedLaptop){
        throw new Error("Laptop not found")
    }
    return deletedLaptop
}


export const listLaptops = async (dataSet)=>{

    const laptops = await Laptop.find({}).populate("brand_id")
    return laptops

}

export const getOneLaptop = async (dataSet)=>{
    const id = dataSet
    const laptop = await Laptop.findById(id)
    if (!laptop){
        throw new Error("Laptop not found")
    }
    return laptop
}

export const filterLaptops = async (dataSet)=>{

    const {brands, gpu, cpu, fromRam, toRam} = dataSet
    console.log(brands)
    const filter = {}

    if(brands?.length && Array.isArray(brands)){
        filter.brand_id = {$in: brands.map(id => new mongoose.Types.ObjectId(id))
        }
    }

    if (gpu?.length && Array.isArray(gpu)){
        filter["specifications.gpu"] = {$in : gpu}
    }

    if (cpu?.length && Array.isArray(cpu)){
        filter["specifications.cpu"] = {$in : cpu}
    }

    const ram = {}
    if (fromRam !== undefined) ram.$gte = fromRam
    if (toRam !== undefined) ram.$lte = toRam

    if (Object.keys(ram).length) {
        filter["specifications.ram"] = ram
    }

    const filtered = await Laptop.find(filter)
    return filtered


}