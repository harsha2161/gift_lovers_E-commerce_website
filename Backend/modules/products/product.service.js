import product from "./product.model.js";

export default async function AddProduct(productsDetials){
    
    const NewProduct = new product({
        ...productsDetials
    })

    return await NewProduct.save()
}