import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    orderId:{ 
        type: String,
        required:true,
        unique:true,
    },
    products:[
        {
            quantity:Number,
            title:String,
        },
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"Delivered",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    
},
{timestamps:true},
);

export default mongoose.models.Order || mongoose.model("Order",OrderSchema);