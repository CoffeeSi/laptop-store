import mongoose from "mongoose"

const customers_schema = mongoose.Schema({

    full_name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    phone : {type : String, required : true, unique : true},
    address : {type : String, required : true},
    created_at : {type : Date, default : Date.now},
    password : {type : String, required : true, unique : true},
    role : {type : String, enum : ["admin", "customer"]} // either : admin, customer

})

const Customer = mongoose.model("Customers", customers_schema)

export default Customer;