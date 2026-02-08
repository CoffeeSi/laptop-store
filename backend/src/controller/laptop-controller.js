import { uniqueComponents, createLaptop, getOneLaptop, removeLaptop, retrieveLaptops, updateLaptopStock } from "../services/laptop-service.js"
import { getLaptopsQuerySchema } from "./dto/filter-request.js"
import { createLaptopDTO } from "./dto/create-laptop.js"
import * as z from "zod"
export const addLaptop = async (req,res,next)=>{

    try{
        const dto = await createLaptopDTO.parseAsync(req.body)
        const newLaptop = await createLaptop(dto)
        res.status(201).json(newLaptop)

    }catch(err){
        if (err instanceof z.ZodError){
            return res.status(400).json({message : "Bad request data"})
        }
        if (err.message === "not in stock"){
            return res.status(400).json({message : "not in stock"})
        }
        if (err.message == "bad data"){
            return res.status(400).json({message : "bad data"})
        }
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)

    }

}

export const getFilters = async (req, res, next) =>{
    try {
      const data = await uniqueComponents();
      res.status(200).json(data);
      
    } catch (err) {
        next(err)
    }
}


export const deleteLaptop = async (req,res,next) =>{


    try{
        const deletedLaptop = await removeLaptop(req.params.id)
        return res.status(200).json(deletedLaptop)

    }catch(err){
        if (err.message == "Laptop not found"){
            return res.status(404).json({message : "Laptop not found"})
        }
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)
    }

}



// export const getLaptops = async(req,res,next)=>{
//     try{
//     const laptops = await  listLaptops({})

//     return res.status(200).json(laptops)
    
//     }catch(err){
//         next(err)
//     }
// }

export const getLaptopById = async(req,res,next)=>{
    try{
    const laptop = await getOneLaptop({laptop_id : req.params.id})

    return res.status(200).json(laptop) 
    }catch(err){
        if (err.message == "Laptop not found"){
            return res.status(404).json({message : "Laptop not found"})
        }
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)
    }

}

export const getLaptops = async (req,res,next)=>{
    try{        
        const parsedQuery = getLaptopsQuerySchema.parse(req.query)

        const dataSet = {
        brands: parsedQuery.brands,
        gpus: parsedQuery.gpus,
        cpus: parsedQuery.cpus,
        storage: parsedQuery.storage,
        ram: parsedQuery.ram,
        page: parsedQuery.page
        }
        const result = await retrieveLaptops(dataSet)
        res.status(200).json(result)
    } catch(err){
        next(err)
    }
}

export const updateStock = async(req, res, next) =>{
    try{
        const { stock_quantity } = req.body
        const laptop = await updateLaptopStock({
            laptop_id: req.params.id,
            stock_quantity
        })
        return res.status(200).json(laptop)
    }catch(err){
        if (err.message === "Laptop not found"){
            return res.status(404).json({message : "Laptop not found"})
        }
        if(err.message === "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        if(err.message === "invalid stock quantity"){
            return res.status(400).json({ message: "invalid stock quantity"})
        }
        next(err)
    }
}

// export const patchLaptop = async(req,res,next) =>{


//     try{
//         const id = req.params.id
//         const {model_name, price, specifications, stock_quantity, brand_id} = req.body


//         const updatedData = {}

//         if (model_name) updatedData.model_name = model_name
//         if (price !== undefined) updatedData.price = price
//         if (specifications && specifications.length !==0) updatedData.specifications = specifications
//         if (stock_quantity !== undefined) updatedData.stock_quantity = stock_quantity
//         if (brand_id) updatedData.brand_id = brand_id
//         const laptop = await Laptop.findByIdAndUpdate(id, updatedData, {new : true, runValidators : true})
//         if (!laptop){
//             return res.status(404).json({message : "Laptop not found"})
//         }
//         return res.status(200).json(laptop)
        
//     }catch(err){
//         next(err)
//     }

// }