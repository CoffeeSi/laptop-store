const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.static("public"))
app.use(express.json())
mongoose.connect("mongodb+srv://admin:ykNFc2VCaOxg15po@cluster0.ot5cxkf.mongodb.net/laptop_store?appName=Cluster0")


const customers_schema = mongoose.Schema({

    full_name : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : String, required : true},
    address : {type : String, required : true},
    created_at : {type : Date, default : Date.now}

})


const Customer = mongoose.model("Customers", customers_schema)

const reviews_schema = mongoose.Schema({

    rating : {type : Number, required : true},
    comment : {type : String, required : true},
    review_date : {type : Date, default : Date.now},
    laptop_id : {type : mongoose.Types.ObjectId, required : true},
    customer_id : {type : mongoose.Types.ObjectId, required : true}

})
const Reviews = mongoose.model("Reviews", reviews_schema)
app.get("/", async (req, res)=>{

    res.send(__dirname + "/public/index.html")

})

app.post("/ping/reviews", async (req,res)=>{

    const newReview = new Reviews({

        rating : req.body.rating

    })

})

app.post("/ping/customer", async (req,res)=>{

    const newCustomer = new Customer({

        full_name : req.body.full_name,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address

    })
    await newCustomer.save()

    res.send(newCustomer)

})

app.listen("3000", ()=>{

    console.log("listening on 3000")

})