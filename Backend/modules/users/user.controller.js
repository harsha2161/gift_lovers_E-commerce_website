import  { CreateUser, DeleteUserByEmail, GetAllUsers, LoginUser, LoginWithGoogle, UpdateUserByEmail } from "./user.service.js";

export async function createUser(req, res, next) {
    try {
        const user = await CreateUser(req.body, req.user);
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
        next(error);
    }
}

export async function loginWithGoogle(req, res, next) {
    try {
        const result = await LoginWithGoogle(req.body.accessToken);
        res.status(200).json({ message: "Login successful", ...result });
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await LoginUser(email, password);
        res.status(200).json({ message: "Login successful", ...result });
    } catch (error) {
        next(error);
    }
}

export async function viewUsers(req, res, next) {
    try {
        const users = await GetAllUsers();
        res.status(200).json({data: users});
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        await DeleteUserByEmail(req.params.email);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export async function blockUser(req, res, next) {
    try {
        await UpdateUserByEmail(req.params.email, req.body);
        res.status(200).json({ message: "User blocked/updated successfully" });
    } catch (error) {
        next(error);
    }
}

export function getUser(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "User not found or not logged in" });
    }
    res.status(200).json(req.user);
}
