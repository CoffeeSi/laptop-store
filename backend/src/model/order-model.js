import mongoose from "mongoose"

const order_schema = mongoose.Schema({

    user_id : {type : mongoose.Types.ObjectId, required : true, ref : "Users"},
    order_date : {type : Date, default: Date.now},
    status : {type : String, enum : ["pending", "shipping", "delievered"], required: true},
    total_price : {type : Number, required: true, min : 0},
    items : [{laptop_id: { type: mongoose.Types.ObjectId, required: true, ref : "Laptops" }, quantity: { type: Number, required: true }, unit_price: { type: Number, required: true }
  }
]

})

const Order = mongoose.model("Orders", order_schema)