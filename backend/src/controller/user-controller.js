import mongoose from "mongoose"
import User from "../model/user-model.js"
import { isValidEmail, isValidPhone } from "../utils/validation.js"
import { UserOrders } from "../services/user-service.js"

//add_user валидация присутствует
//айди не прилетает БЕРЕТСЯ ИЗ ЗАПРОСА валидация присутствует
export const deleteUser = async (req,res,next)=>{

    try{
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser){
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).json(deletedUser)
    }
    catch(err){
        next(err)
    }

}
// айди не прилетает БЕРЕТСЯ ИЗ ЗАПРОСА валидация присутствует
export const patchUser = async(req,res,next)=>{
    try{

        const dataSet = {
            id : req.params.id,
            data : req.body
        }

        const patchedUser = await patchUser(dataSet)
        return res.status(200).json(patchedUser)

    }catch(err){
        if (err.message == "invalid phone format"){
            return res.status(400).json({ message: "invalid phone format" })
        }
        if(err.message == "invalid email format"){
            return res.status(400).json({message : "invalid email format"});
        }
        if(err.message == "email already exists"){
            return res.status(409).json({ message: "email already exists" })
        }
        if(err.message == "User not found"){
            return res.status(404).json({message : "User not found"})
        }
        next(err)
    }
}
// собирает всех юзеров
export const getUsers = async(req,res,next)=>{
    try{

        const users = await User.find({})
        return res.status(200).json(users)
    }catch(err){
        next(err)
    }

}

//юзер по айди айди не прилетает БЕРЕТСЯ ИЗ ЗАПРОСА валидация присутствует
export const getUserById = async(req,res,next)=>{
    try{
        const id = req.params.id

        const user = await User.findById(id)
        if (!user){
            return res.status(404).json({message : "user not found"})
        }
        return res.status(200).json(user)

    }catch(err){
        next(err)
    }

}

export const getOrdersOfUser = async (req,res,next)=>{
    try{
        const dataSet = {

            user_id : req.params.id,

        }
        const orders = await UserOrders(dataSet)
        res.status(200).json(orders)
    }catch(err){
        if(err.message == "not found"){
            return res.status(404).json({message : "user not found"})
        }
        next(err)
    }

}