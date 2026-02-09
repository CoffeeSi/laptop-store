import * as z from "zod"
import { getUserDataById, getUserOrders } from "../services/user-service.js"

// pod voprosom
export const patchUser = async(req,res,next)=>{
    try{
        const dto = z.parseAsync(req.body)
        const patchedUser = await patchUser({id : req.params.id, data : dto})
        return res.status(200).json(patchedUser)
    }catch(err){
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        if (err instanceof z.ZodError){
            return res.status(400).json({message : "Bad request data"})
        }
        if(err.message == "User not found"){
            return res.status(404).json({message : "User not found"})
        }
        next(err)
    }
}


// export const getUsers = async(req,res,next)=>{
//     try{

//         const users = await User.find({})
//         return res.status(200).json(users)
//     }catch(err){
//         next(err)
//     }

// }

export const getUserById = async(req,res,next)=>{
    try{
        const requesterId = req.user?.userID || req.session?.userID;
        const data = await getUserDataById({user_id : req.params.id, requester_id : requesterId})
        return res.status(200).json(data)

    }catch(err){
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        next(err)
    }

}

export const getOrdersOfUser = async (req,res,next)=>{
    try{
        const orders = await getUserOrders({user_id : req.params.id})
        res.status(200).json(orders)
    }catch(err){
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }
        if(err.message == "not found"){
            return res.status(404).json({message : "user not found"})
        }
        next(err)
    }

}

export const getReviewsOfUser = async (req,res,next)=>{

    try{
        const reviews = await getUserReviews({user_id : req.params.id})
        res.status(200).json(reviews)
    }
    catch(err){
        if(err.message == "invalid id"){
            return res.status(400).json({ message: "invalid id"})
        }

        next(err) 
    }

}


// export const deleteUser = async (req,res,next)=>{

//     try{
//         const id = req.params.id
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser){
//             return res.status(404).json({message : "User not found"})
//         }
//         return res.status(200).json(deletedUser)
//     }
//     catch(err){
//         next(err)
//     }

// }

