import User from "../model/user-model.js"
import { isValidEmail, isValidPhone } from "../utils/validation.js"

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
        const id = req.params.id
        const { full_name, email, phone, address } = req.body

//VALIDATION PHONE

        if (phone && !isValidPhone(phone)) {
            return res.status(400).json({ message: "invalid phone format" })
        }

//VALIDATION EMAIL 
// IF 
// 1. VALID FORMAT
// 2. EXISTS
        
        if (!isValidEmail(email) && email){

            return res.status(400).json({message : "invalid email format"});

        }
        if (email){
            const exists = await User.findOne({email : email, _id : {$ne : id}})
            if (exists) {
                return res.status(409).json({ message: "email already exists" })
            }
        }

        const updateData = {}
        if (full_name) updateData.full_name = full_name
        if (email) updateData.email = email
        if (phone) updateData.phone = phone
        if (address) updateData.address = address
        const user = await User.findByIdAndUpdate(
            id, updateData, {new: true,runValidators: true})

        if (!user){
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).json(user)
    }catch(err){

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