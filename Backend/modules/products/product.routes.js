import express from "express";
import { addProduct, deleteProduct, updateProduct, viewProduct, viewProductById } from "./product.controller.js";
import { isAdmin, protect } from "../../api/middlewares/auth.middleware.js";

const ProductRouter = express.Router()

ProductRouter.post("/addproduct", protect, isAdmin, addProduct)
ProductRouter.delete("/deleteproduct/:productId", protect,isAdmin,deleteProduct)
ProductRouter.put("/updateproduct/:productId", protect,isAdmin , updateProduct)

ProductRouter.get("/viewproducts",protect, viewProduct)
ProductRouter.get("/:productId", viewProductById)

export default ProductRouter