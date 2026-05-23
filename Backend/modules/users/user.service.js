import User from "./user.model.js";
import AppError from "../../shared/errors/AppError.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

//Create User
export async function CreateUser(userData, currentUser) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError("Email is already registered", 400);
    }

    if (userData.role === "admin") {
        if (!currentUser || currentUser.role !== "admin") {
            throw new AppError("You are not authorized to create an admin account. Please login first as admin.", 403);
        }
    }

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = new User({
        ...userData,
        password: hashedPassword
    });

    return await newUser.save();
}

//Login With Google
export async function LoginWithGoogle(token) {
    if (!token) throw new AppError("Access token is required", 400);

    const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const googleUser = response.data;
    let userRecord = await User.findOne({ email: googleUser.email });

    if (!userRecord) {
        userRecord = new User({
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.email,
            img: googleUser.picture,
            password: "google",
            role: "user"
        });
        await userRecord.save();
    }

    const jwtToken = jwt.sign({
        email: userRecord.email,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        img: userRecord.img,
        role: userRecord.role
    }, process.env.JWT_KEY);

    return { token: jwtToken, role: userRecord.role };
}

//Normal Login
export async function LoginUser(email, password) {

    const user = await User.findOne({ email })
    if (!user) throw new AppError("Invalid email address", 401)

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (!isPasswordCorrect) throw new AppError("Invalid password", 401)

    const token = jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        img: user.img,
        role: user.role
    }, process.env.JWT_KEY);

    return { token, type: user.role };
}

// View Users
export async function GetAllUsers() {
    return await User.find()
}

//Delete User
export async function DeleteUserByEmail(email) {
    return await User.deleteOne({ email })
}

// Block/Update User
export async function UpdateUserByEmail(email, updatingData) {
    return await User.updateOne({ email }, updatingData)
}

