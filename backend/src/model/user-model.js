import mongoose from "mongoose"

const user_schema = mongoose.Schema({

<<<<<<< HEAD
        full_name : {type : String, required : true},
        email : {type : String, required : true, unique : true},
        phone : {type : String, required : true},
        address : {type : String, required : true},
        created_at : {type : Date, default : Date.now},
        passwordHash : {type : String, required : true},
        role : {type : String, enum : ["admin", "customer"], default : "customer"}// either : admin, customer
=======
    full_name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    phone : {type : String, required : true},
    address : {type : String, required : true},
    created_at : {type : Date, default : Date.now},
    password : {type : String, required : true},
    role : {type : String, enum : ["admin", "customer"]}// either : admin, customer
>>>>>>> d36d5aa27ff1632bc20a8f8565273c920dbe8f37

})

const User = mongoose.model("Users", user_schema)

export default User
