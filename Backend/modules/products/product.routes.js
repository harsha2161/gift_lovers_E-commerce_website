import express from "express";
import { addProduct, deleteProduct, updateProduct, viewProduct, viewProductById } from "./product.controller.js";
import { isAdmin, protect } from "../../api/middlewares/auth.middleware.js";

const ProductRouter = express.Router()

ProductRouter.post("/addproduct", protect, isAdmin, addProduct)
ProductRouter.post("/deleteproduct/:productId", protect,deleteProduct)
ProductRouter.post("/updateproduct/:productId", protect , updateProduct)

ProductRouter.get("/viewproducts",protect, viewProduct)
ProductRouter.get("/:productId", viewProductById)

export default ProductRouter