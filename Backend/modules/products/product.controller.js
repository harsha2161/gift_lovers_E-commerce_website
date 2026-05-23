import AddProduct from "./product.service.js";

export async function addProduct(req, res, next){

    try{
        const products = await AddProduct(req.body)
        res.status(201).json({ message : "Product added successfully", data : products})
    }catch(error){
        next(error)
    }
}