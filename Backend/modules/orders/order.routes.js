import express from "express";
import { createOrder, getAllOrder } from "./order.controller.js";
import { isAdmin, protect } from "../../api/middlewares/auth.middleware.js";

const OrderRouter = express.Router()

OrderRouter.post("/createorder", protect, createOrder)

OrderRouter.get("/vieworders", protect, isAdmin, getAllOrder)

export default OrderRouter
