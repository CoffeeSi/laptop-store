import mongoose from "mongoose"
import Laptop from "../model/laptop-model.js"
import {validateLaptopData} from "../utils/validation.js"
export const addLaptop = async (req,res,next)=>{

    try{

        const isValid = validateLaptopData(req.body)
        if (!isValid) return res.status(400).json({message : "bad data"})

        const {model_name, price, specifications, stock_quantity, brand_id} = req.body 

        const newLaptop = new Laptop({model_name, price, specifications, stock_quantity, brand_id})

        await newLaptop.save()

        res.status(201).json(newLaptop)

    }catch(err){

        next(err)

    }

}

export const deleteLaptop = async (req,res,next) =>{


    try{

        const id = req.params.id
        const deletedLaptop = await Laptop.findByIdAndDelete(id);
        if (!deletedLaptop){
            return res.status(404).json({message : "Laptop not found"})
        }

        return res.status(200).json(deletedLaptop)

    }catch(err){
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
    const laptops = await Laptop.find({}).populate("brand_id")
    return res.status(200).json(laptops)
    }catch(err){
        next(err)
    }
}

export const getLaptopById = async(req,res,next)=>{
    try{
    const id = req.params.id
    const laptop = await Laptop.findById(id)

    if (!laptop){
        return res.status(404).json({message : "Laptop not found"})
    }

    return res.status(200).json(laptop) 
    }catch(err){
        next(err)
    }

}