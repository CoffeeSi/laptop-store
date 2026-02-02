import {Router} from "express"

const router = Router()
router.post("/ping/reviews", async (req,res)=>{

    const newReview = new Reviews({

        rating : req.body.rating,
        comment : req.body.comment,
        laptop_id : req.body.laptop_id,
        customer_id : req.body.customer_id

    })

    await newReview.save()
    res.send(newReview)

})


router.get("/reviews", async (req,res)=>{

    const reviews = mongoose.find


})

export default router