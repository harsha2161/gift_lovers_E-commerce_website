import { GetAllUsers } from "../users/user.service.js";
import { CreateOrder } from "./order.service.js";

export async function createOrder(req, res, next) {
    try {
        
        const createdOrder = await CreateOrder(req.body, req.user);
        res.status(201).json({message: "Order created successfully",order: createdOrder})
    } catch (error) {
        next(error)
    }
}

export async function GetAllOrder(req,res, next){
    try{
        const orders = await GetAllUsers()
        res.status(200).json(orders)
    } catch(error){
        next(error)
    }
}