import express from "express";
import { blockUser, createUser, deleteUser, getUser, loginUser, loginWithGoogle, viewUsers } from "./user.controller.js";
import { isAdmin, protect } from "../../api/middlewares/auth.middleware.js"; 
import { userValidation } from "./user.validation.js";

const UserRouter = express.Router()

// Public Routes
UserRouter.post("/login", loginUser)
UserRouter.post("/google-login", loginWithGoogle)
UserRouter.post("/register", userValidation, createUser)
UserRouter.get("/me", protect, getUser)

// Admin Only Routes
UserRouter.get("/", protect, isAdmin, viewUsers)
UserRouter.delete("/:email", protect, isAdmin, deleteUser)
UserRouter.put("/:email", protect, isAdmin, blockUser)

export default UserRouter