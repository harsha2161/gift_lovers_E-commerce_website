import {AddProduct , DeleteProduct, UpdateProduct, ViewProduct, ViewProductById } from "./product.service.js";

export async function addProduct(req, res, next){

    try{
        const products = await AddProduct(req.body)
        res.status(201).json({ message : "Product added successfully", data : products})
    }catch(error){
        next(error)
    }
}

export async function viewProduct(req, res, next){
    
    try{
        const products = await ViewProduct(req.user)
        res.status(201).json({data: products})
    }catch(error){
        next(error)
    }
}

export async function deleteProduct(req, res, next){

    try{
        await DeleteProduct(req.params.productId)
        res.status(201).json({message : `product ${req.params.productId} is deleted successfully`})
    }catch(error){
        next(error)
    }
}

export async function updateProduct(req,res, next){
    
    try{
        await UpdateProduct(req.body, req.params.productId)
        res.status(201).json({message : `product ${req.params.productId} updated`}) 
    }catch(error){
        next(error)
    }
}

export async function viewProductById(req,res,next){
    
    try{
        const product = await ViewProductById(req.params.productId)
        res.status(201).json({data : product})
    }catch(error){
        next(error)
    }
}