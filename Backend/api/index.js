import express from "express";
import UserRouter from "../modules/users/user.routes.js";
import ProductRouter from "../modules/products/product.routes.js";
import OrderRouter from "../modules/orders/order.routes.js";


const apiRouter = express.Router()

apiRouter.use("/users",  UserRouter)
apiRouter.use("/products", ProductRouter)
apiRouter.use("/orders", OrderRouter )


export default apiRouter