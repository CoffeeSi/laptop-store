import mongoose from "mongoose"
import Laptop from "../model/laptop-model.js"
import Brand from "../model/brand-model.js"


export const createLaptop = async(dataSet)=>{

    const {model_name, price, specifications, stock_quantity, brand_id} = dataSet
    
    if (!mongoose.Types.ObjectId.isValid(dataSet.brand_id)){
        throw new Error("invalid id")
    }

    const exists = await Brand.exists({ _id: brand_id })
    if (!exists) {
        throw new Error("brand not found")
    }
    const newLaptop = new Laptop({model_name, price, specifications, stock_quantity, brand_id})

    await newLaptop.save()
    return newLaptop
}


export const removeLaptop = async(dataSet) =>{

    const id = dataSet
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
    }
    const deletedLaptop = await Laptop.findByIdAndDelete(id);
    if (!deletedLaptop){
        throw new Error("Laptop not found")
    }
    return deletedLaptop
}

export const updateLaptopStock = async(dataSet) =>{
    const {laptop_id, stock_quantity} = dataSet
    
    if (!mongoose.Types.ObjectId.isValid(laptop_id)){
        throw new Error("invalid id")
    }
    
    if (typeof stock_quantity !== 'number' || stock_quantity < 0){
        throw new Error("invalid stock quantity")
    }
    
    const laptop = await Laptop.findByIdAndUpdate(
        laptop_id, 
        { stock_quantity }, 
        { new: true, runValidators: true }
    );
    
    if (!laptop){
        throw new Error("Laptop not found")
    }
    
    return laptop
}


// export const listLaptops = async (dataSet)=>{

//     const laptops = await Laptop.find({}).populate("brand_id")
//     return laptops

// }

export const uniqueComponents = async ()=>{
    // const minRam = await Laptop.findOne().sort({"specifications.ram": 1}).exec()
    // const maxRam = await Laptop.findOne().sort({"specifications.ram": -1})

    const [cpus, gpus, storage, ram] = await Promise.all(
    [
        Laptop.distinct('specifications.cpu'),
        Laptop.distinct('specifications.gpu'),
        Laptop.distinct('specifications.storage'),
        {
            "min": 8,
            "max": 32
        }
    ]);

    return { cpus, gpus, storage, ram };
  }

export const getOneLaptop = async (dataSet)=>{
    const id = dataSet.laptop_id
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("invalid id")
    }
    const laptop = await Laptop.findById(id)
    if (!laptop){
        throw new Error("Laptop not found")
    }
    return laptop
}

export const retrieveLaptops = async (dataSet)=>{
    //validation ? 
    const { brands, gpus, cpus, storage, ram , page} = dataSet
    const pageNumber = Math.max(1, Number(page) || 1)
    const laptopsOnPage = 20
    const skipCount = (pageNumber - 1) * laptopsOnPage
    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        throw new Error("Invalid page number")
    }
    const brandsArray = brands ? Array.from(brands.split(',')) : []
    const cpuArray = cpus ? Array.from(cpus.split(',')) : []
    const gpuArray = gpus ? Array.from(gpus.split(',')) : []
    const storageArray = storage ? Array.from(storage.split(',')) : []
    const filter = {}

    if (brandsArray.length && Array.isArray(brandsArray)){        
        filter.brand_id = {$in: brandsArray.map(id => new mongoose.Types.ObjectId(id))}
    }
    if (gpuArray.length && Array.isArray(gpuArray)){
        
        filter["specifications.gpu"] = {$in : gpuArray}
    }

    if (cpuArray.length && Array.isArray(cpuArray)){
        filter["specifications.cpu"] = {$in : cpuArray}
    }
    if (storageArray.length && Array.isArray(storageArray)){
        filter["specifications.storage"] = {$in : storageArray}
    }

    const ramFilter = {}
    
    if (ram) {
        try {
            const ramObj = typeof ram === 'string' ? JSON.parse(ram) : ram
            if (ramObj.min !== undefined) ramFilter.$gte = parseFloat(ramObj.min)
            if (ramObj.max !== undefined) ramFilter.$lte = parseFloat(ramObj.max)
        } catch (e) {
            console.error("Error parsing RAM filter:", e)
        }
    }

    if (Object.keys(ramFilter).length) {
        filter["specifications.ram"] = ramFilter
    }
    
    const [filtered, totalCount] = await Promise.all([
        Laptop.find(filter).populate("brand_id", "brand_name").sort({stock_quantity : -1}).skip(skipCount).limit(laptopsOnPage),
        Laptop.countDocuments(filter)
    ])
    
    return {
        laptops: filtered,
        totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / laptopsOnPage),
        laptopsPerPage: laptopsOnPage
    }
}