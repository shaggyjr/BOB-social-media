import mongoose from "mongoose";

const Schema = mongoose.Schema;
const imgSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String, 
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId, 
        ref:"User",
        required:true
    },
});
export default mongoose.model("Img",imgSchema);
