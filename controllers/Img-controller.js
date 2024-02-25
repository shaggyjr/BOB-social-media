import mongoose from "mongoose";
import Img from "../model/Img.js";
import User from "../model/User.js";
export const getAllImg=async(req,res,next)=>{
    let imgs;
    try{
        imgs=await Img.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!imgs){
        return res.status(404).json({messaage:"No Image Found."});
    }
    return res.status(200).json({imgs});};
    export const addImg = async(req,res,next)=>{
        const {title,description,image,user}=req.body;
        let existingUser;
        try{
            existingUser=await User.findById(user);
            }
        catch(err){
            return console.log(err)
        }
        if(!existingUser){
            return res.status(500).json({messaage:"Unable To Find User."});
        }
        
    const img = new Img(
        {
            title,description,image,user
        }
    );
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await img.save({session});
        existingUser.imgs.push(img);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
         console.log(err)
         return res.status(500).json({messaage:err})
    }
    return res.status(200).json({img})
    };

    export const updateImg = async(req,res,next)=>{
        const {title,description}=req.body;
        const imgid=req.params.id;
        let img;
        try{
            img=await Img.findByIdAndUpdate(imgid,{
                title,description
            })
        }catch(err){
            return console.log(err)
        }
        if(!img){
            return res.status(500).json({messaage:"Unable to Update."});
        }
        return res.status(200).json({img});};
    
        export const getById= async(req,res,next)=>{
            const id = req.params.id;
            let img;
            try{
                img = Img.findById(id);
            }catch(err){
            return console.log(err)
        }
        if(!img){
            return res.status(404).json({messaage:"No Image Found."});
        }
        return res.status(200).json({img});
    };
    export const deleteImg = async(req,res,next)=>{
        const id = req.params.id;
        let img;
        try{
            img = await Img.findByIdAndRemove(id).populate('user');
            await img.user.imgs.pull(img);
            await img.user.save();
        }catch(err){
            return console.log(err)
        }
        if(!img){
            return res.status(500).json({messaage:"Unable To Delete."});
        }
        return res.status(200).json({messaage:"Successfully Deleted."});
    };

    export const getByUserId=async(req,res,next)=>{
        const userId = req.params.id;
        let userImgs;
        try{
            userImgs = await Img.findById(userId).populate('img');
            await img.user.imgs.pull(img);
            await img.user.save();
        }catch(err){
            return console.log(err)
        }
        if(!userImgs){
            return res.status(404).json({messaage:"Not Available."});
        }
        return res.status(200).json({imgs:userImgs});
    };
    