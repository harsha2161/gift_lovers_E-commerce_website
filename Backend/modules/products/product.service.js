import product from "./product.model.js";

export async function AddProduct(productsDetials){
    
    const NewProduct = new product({
        ...productsDetials
    })

    return await NewProduct.save()
}

export async function ViewProduct(user){
    if(user && user.role == "admin"){
        return await product.find()
    } else {
        return await product.find({isAvailable : true})
    }
}

export async function DeleteProduct(productId){
    return await product.deleteOne({productId : productId})
}

export async function UpdateProduct(updateDetails, productId){
    return await product.updateOne({productId : productId}, updateDetails)
}

export async function ViewProductById(productId){
    return await product.findOne({productId : productId})
}
