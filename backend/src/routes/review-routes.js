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


export default review_router;
