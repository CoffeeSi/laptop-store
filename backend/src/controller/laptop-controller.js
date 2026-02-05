import mongoose from "mongoose"
import Laptop from "../model/laptop-model.js"
import {validateLaptopData} from "../utils/validation.js"
import { createLaptop, filterLaptops, listLaptops, removeLaptop } from "../services/laptop-service.js"
export const addLaptop = async (req,res,next)=>{

    try{

        const newLaptop = await createLaptop(req.body)
        res.status(201).json(newLaptop)

    }catch(err){
        if (err.message == "bad data"){
            return res.status(400).json({message : "bad data"})
        }
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
        next(err)
    }

}

export const patchLaptop = async(req,res,next) =>{


    try{
        const id = req.params.id
        const {model_name, price, specifications, stock_quantity, brand_id} = req.body


        const updatedData = {}

        if (model_name) updatedData.model_name = model_name
        if (price !== undefined) updatedData.price = price
        if (specifications && specifications.length !==0) updatedData.specifications = specifications
        if (stock_quantity !== undefined) updatedData.stock_quantity = stock_quantity
        if (brand_id) updatedData.brand_id = brand_id
        const laptop = await Laptop.findByIdAndUpdate(id, updatedData, {new : true, runValidators : true})
        if (!laptop){
            return res.status(404).json({message : "Laptop not found"})
        }
        return res.status(200).json(laptop)
        
    }catch(err){
        next(err)
    }

}

export const getLaptops = async(req,res,next)=>{
    try{
    let dataSet = {}
    const laptops = await  listLaptops(dataSet)

    return res.status(200).json(laptops)
    
    }catch(err){
        next(err)
    }
}

export const getLaptopById = async(req,res,next)=>{
    try{
    const laptop = await listLaptops(req.params.id)


    return res.status(200).json(laptop) 
    }catch(err){
        if (err.message == "Laptop not found"){
            return res.status(404).json({message : "Laptop not found"})
        }
        next(err)
    }

}

export const getFilteredLaptops = async (req,res,next)=>{
    try{
    const dataSet = {

        brands : req.params.brands,
        gpu : req.params.gpu,
        cpu : req.params.cpu,
        fromRam : req.params.fromRam,
        toRam : req.params.toRam

    }
    const filtered = await filterLaptops(req.body)
    res.status(200).json(filtered)
    }catch(err){
        next(err)
    }
}