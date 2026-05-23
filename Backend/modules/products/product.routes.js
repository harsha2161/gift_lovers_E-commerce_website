import express from "express";
import { addProduct } from "./product.controller.js";
import { isAdmin } from "../../api/middlewares/auth.middleware.js";

const ProductRouter = express.Router()

ProductRouter.post("/addproduct", isAdmin, addProduct)

export default ProductRouter