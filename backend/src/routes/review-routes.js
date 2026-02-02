import {Router} from "express"

const review_router = Router()
review_router.post("/ping/reviews", async (req,res)=>{

    const newReview = new Reviews({

        rating : req.body.rating,
        comment : req.body.comment,
        laptop_id : req.body.laptop_id,
        customer_id : req.body.customer_id

    })

    await newReview.save()
    res.send(newReview)

})

// router.post("/ping/customer", async (req,res)=>{

//     const newCustomer = new Customer({

//         full_name : req.body.full_name,
//         email : req.body.email,
//         phone : req.body.phone,
//         address : req.body.address

//     })
//     await newCustomer.save()

//     res.send(newCustomer)

// })

export default review_router;