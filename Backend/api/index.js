import express from "express";
import UserRouter from "../modules/users/user.routes.js";


const apiRouter = express.Router()

apiRouter.use("/users", UserRouter)


export default apiRouter