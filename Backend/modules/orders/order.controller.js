import { GetAllUsers } from "../users/user.service.js";
import { CreateOrder, GetAllOrder } from "./order.service.js";

export async function createOrder(req, res, next) {
    try {

        const createdOrder = await CreateOrder(req.body, req.user);
        res.status(201).json({ message: "Order created successfully", order: createdOrder })
    } catch (error) {
        next(error)
    }
}

export async function getAllOrder(req, res, next) {
    try {
        const orders = await GetAllOrder()
        res.status(200).json({data : orders})
    } catch (error) {
        next(error)
    }
}