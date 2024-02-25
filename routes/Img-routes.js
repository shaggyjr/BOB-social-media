import express  from "express";
import {addImg, deleteImg, getAllImg, getById, getByUserId, updateImg} from "../controllers/Img-controller.js";
const imgrouter=express.Router();


imgrouter.get("/",getAllImg);
imgrouter.post("/add",addImg);
imgrouter.put("/update/:id",updateImg);
imgrouter.get("/:id",getById);
imgrouter.delete("/:id",deleteImg);
imgrouter.get('/user/:id',getByUserId);
export default imgrouter;
