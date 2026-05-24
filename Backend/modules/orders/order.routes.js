import express from "express";
import {createOrder} from "./order.controller.js";
import { isAdmin, protect } from "../../api/middlewares/auth.middleware.js";

const OrderRouter = express.Router()

OrderRouter.post("/createorder", protect, createOrder)

OrderRouter.get("/vieworders", isAdmin, protect)

export default OrderRouter

